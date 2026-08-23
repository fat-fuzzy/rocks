import type {
	Uuid,
	Rank,
	Slug,
	DocLanguage,
	DocMeta,
	DocPath,
	Section,
	Block,
	Prose,
	DocStore,
	DocIndex,
	OPFSTreeDoc,
	DocContentType,
	IAggregateDocs,
	Subsection,
	TagGroup,
	TagIndex,
	FileExt,
} from '$types'

import WorkerBridge from '$lib/workers/worker-bridge'
import {getBridge} from '$lib/aggregates/bridge'

import {SCHEMA_VERSION} from '$config/setup'
import {sortByRankAsc} from '$lib/common/sort'
import {getTagKey} from '$lib/common/format'
import {getSectionKey, getBlockKey} from '$lib/common/format'
import {opfsDocTreeToDocStore} from '$lib/common/transform/opfs-to-doc'
import {buildDocIndex} from '$lib/common/transform/store-to-index'
import {
	updateBlockInSection,
	deleteBlockInSection,
} from '$lib/common/transform/operations-block'
import {SvelteMap} from 'svelte/reactivity'

/**
 * AggregateDocs class to manage access to stored docs
 * Maintains a cache of data in memory
 * Sends/receive messages via worker bridge
 */
export default class AggregateDocs implements IAggregateDocs {
	bridge: WorkerBridge | undefined = $state()
	loading = $state(false)
	error = $state(false)
	content: DocStore = $state({})
	docIndex: DocIndex = $derived(buildDocIndex(this.content))

	constructor() {
		this.loading = true
	}

	async init() {
		this.bridge = getBridge()
		try {
			this.loading = true

			await this.loadDocStore()
		} catch {
			this.error = true
		} finally {
			this.loading = false
		}
	}

	reset() {
		this.content = {}
	}

	/**
	 * Retrieve prose content content from store
	 * @param path metadata to retrieve file
	 * @param meta content metadata
	 * @returns Prose content or undefined (on Promise resolve)
	 */

	async getProse(options: {
		path: DocPath
		meta: DocMeta
	}): Promise<Prose | undefined> {
		if (!this.bridge) {
			return
		}

		const response = await this.bridge.getProse(options)

		return response as Prose
	}

	/**
	 * Get block for options
	 * @param options block to load, blocks to load within blocks
	 * @returns block
	 */
	getBlock(options: {
		language: DocLanguage
		format: Slug
		section: Slug
		name: string
		subsection?: string
	}): Block {
		const {language, format, section, subsection, name} = options

		return this.docIndex.blocks[
			getBlockKey(language, format, section, name, subsection)
		]
	}

	/**
	 * Create a new Block
	 * @param options block metadata and content
	 */
	async createBlockForLanguageAndFormat(options: {
		name: Slug
		title?: string
		group?: string
		rank: Rank
		parent: Slug
		tags: string[]
		language: DocLanguage
		format: Slug
	}): Promise<{id: string} | void> {
		if (!this.bridge) {
			return
		}

		const {language, format, name} = options

		let doc = this.content[language]?.[format]

		if (!doc) {
			const languageTree = this.content[language]

			if (languageTree) {
				languageTree[format] = {
					schema_version: SCHEMA_VERSION,
					id: `${language}-${format}`,
					meta: {
						id: `${language}-${format}`,
						name: `${language}-${format}`,
						label: format,
						content_type: 'doc-root',
					},
					path: {filename: format, filetype: 'json'},
					sections: [],
				}
				doc = languageTree[format]
			}
		}

		if (!doc) {
			throw Error(`Error creating document "${name}" in format "${format}"`)
		}

		const section = doc.sections?.find((s) => s.name === options.parent)

		if (!section) {
			throw Error(
				`Error creating document "${name}" in section "${options.parent}"`,
			)
		}

		// FIXME: a group will be assigned by default if none is chosen by the user (otherwise the block would overwrite the main section content). The name of the group equals the name of the section
		const group = options.group ? options.group : section.name

		const tags = options.tags.length
			? options.tags
			: !options.tags.length || section.content
				? ['untagged']
				: []

		if (group) {
			const block = {
				id: crypto.randomUUID(),
				parentId: section.id,
				content_type: 'block' as DocContentType,
				rank: options.rank,
				group: group,
				name: options.name,
				content: {
					html: '<p>Edit block content</p>',
					json: {},
				},
				tags,
			}

			section.subsections = this.updateSubsections({
				group,
				block,
				section,
			})
		} else {
			section.content = {
				html: '<p>Edit main section content</p>',
				json: {},
			}
			section.tags = tags
		}

		// Save Block to OPFS
		// Block data is saved within the section file
		await this.bridge.saveSection({
			language,
			format,
			// FIXME: shouldn't have to do this
			section: JSON.parse(JSON.stringify(section)),
		})
	}

	/**
	 * Save block content
	 * @param options block metadata and content
	 */
	async saveBlock(options: {
		language: DocLanguage
		format: Slug
		block: Block
		path: DocPath
	}): Promise<{id: string} | void> {
		if (!this.bridge) {
			return
		}

		const {language, format, block} = options

		// Optimistic update of the local content structure
		// - For UI reactivity: docIndex re-derives automatically
		const doc = this.content[options.language]?.[options.format]
		const sectionRoot = options.path.parent ?? options.path.filename

		if (!doc) {
			return // FIXME: user feedback / create doc ?
		}

		const section = doc.sections?.find((s) => s.name === sectionRoot)

		if (!section) {
			return // FIXME: user feedback / create section ?
		}

		const sectionToUpdate = updateBlockInSection({
			language,
			format,
			block,
			section,
		})

		if (!sectionToUpdate) {
			return // FIXME: user feedback / create section ?
		}

		// Save to OPFS
		// Block data is saved within the section file
		await this.bridge.saveSection({
			language,
			format,
			// FIXME: shouldn't have to do this
			section: JSON.parse(JSON.stringify(sectionToUpdate)),
		})
	}

	/**
	 * Delete a Block
	 * @param options block metadata
	 */
	async deleteBlock(options: {
		name: Slug
		content_type: DocContentType
		group?: string
		parent: Slug
		languages: DocLanguage[]
		formats: Slug[]
	}): Promise<{id: string} | void> {
		if (!this.bridge) {
			return
		}

		const {languages, formats} = options

		for (const language of languages) {
			for (const format of formats) {
				const doc = this.content[language]?.[format]

				if (!doc) {
					continue
				}

				const section = this.getSectionByName({
					language,
					format,
					name: options.parent,
				})

				if (!section) {
					continue
				}
				const sectionToUpdate = deleteBlockInSection({...options, section})

				if (sectionToUpdate) {
					// Save Section to OPFS
					await this.bridge.saveSection({
						language,
						format,
						section: sectionToUpdate,
					})
				}
			}
		}
	}

	/**
	 * @param options tags to delete
	 */
	async untagBlocks(options: {
		group: TagGroup
		tagIndex: TagIndex
		languages: DocLanguage[]
		formats: Slug[]
	}): Promise<TagGroup | void> {
		if (!this.bridge) {
			return
		}

		const {group} = options

		const blocksToUpdate = new SvelteMap<string, Block>()
		const groupToUpdate: TagGroup = {...group, items: []}
		const tagsToKeep: Slug[] = []

		for (const tag of group.items) {
			if (!group.items.includes(tag)) {
				tagsToKeep.push(tag)
			}
		}

		for (const tag of group.items) {
			const tagKey = getTagKey(group.name, tag)

			// 1. Gather blocks to update
			const taggedBlocks = options.tagIndex.taggedBlocks[tagKey]

			if (taggedBlocks) {
				for (const block of taggedBlocks) {
					let toUpdate = blocksToUpdate.get(block.id)

					if (!toUpdate) {
						toUpdate = block
					}

					toUpdate.tags = toUpdate.tags.filter((t) => t !== tag)

					blocksToUpdate.set(toUpdate.id, toUpdate)
				}
			}
		}

		const {languages, formats} = options

		for (const language of languages) {
			for (const format of formats) {
				// 2. Update blocks
				for (const block of blocksToUpdate.values()) {
					const section = this.getSectionById(block.parentId)

					await this.saveBlock({
						language,
						format,
						block,
						path: {
							filename: block.name,
							filetype: 'json' as FileExt,
							parent: section.name,
						},
					})
				}

				// 3. Update sections (TODO: create tagged sections index)
				const doc = this.content[language]?.[format]

				if (!doc) {
					continue
				}

				for (const section of doc.sections) {
					if (section.tags) {
						section.tags = section.tags.filter((t) => !group.items.includes(t))
						await this.bridge.saveSection({
							language,
							format,
							// FIXME: shouldn't have to do this
							section: JSON.parse(JSON.stringify(section)),
						})
					} else if (section.subsections) {
						const defaultGroup = section.subsections.find(
							(sub) => sub.name === section.name,
						)

						if (defaultGroup) {
							for (const block of defaultGroup.blocks) {
								block.tags = block.tags.filter((t) => !group.items.includes(t))
							}

							await this.bridge.saveSection({
								language,
								format,
								// FIXME: shouldn't have to do this
								section: JSON.parse(JSON.stringify(section)),
							})
						}
					}
				}
			}
		}

		// 4. Update tag groups
		if (tagsToKeep.length > 0) {
			groupToUpdate.items = tagsToKeep
			return groupToUpdate
		}
	}

	/**
	 * Get selected section by name for given [language*format]
	 * @param options language, format and name to match
	 * @returns section
	 */
	getSectionByName(options: {
		language: DocLanguage
		format: Slug
		name: Slug
	}): Section {
		const {language, format, name} = options

		return this.docIndex.sections[getSectionKey(language, format, name)]
	}

	/**
	 * Get selected section by name for given [language*format]
	 * @param options language, format and name to match
	 * @returns section
	 */
	getSectionById(id: Uuid): Section {
		return this.docIndex.sectionsById[id]
	}

	/**
	 * Get sections per [language*format] for given rank
	 * @param rank
	 * @returns sections found
	 */
	getSectionsByRank(rank: Rank): Section[] {
		const sections = Object.values(this.docIndex.sections)
		return sections.filter((s) => s.rank === rank)
	}

	/**
	 * Get all sections
	 * @param options section selection to load, blocks to load within sections
	 * @returns Array: {name, section}[]
	 */
	getSections(options: {language: Slug; format: DocLanguage}): Section[] {
		const sectionsFound = Object.entries(this.docIndex.sections).reduce(
			(sections: Section[], [key, value]) => {
				const [language, format] = key.split(':')
				if (language === options.language) {
					if (format === options.format) {
						sections.push(value)
					}
				}

				return sections
			},
			[],
		)
		const result = sectionsFound.sort(sortByRankAsc)

		return result
	}

	/**
	 * Get selected sections for given options
	 * @param options section selection to load, blocks to load within sections
	 * @returns Array: {name, section}[]
	 */
	getSelectedSections(options: {
		language: DocLanguage
		format: Slug
		sections: Slug[]
	}): {name: Slug; section: Section}[] {
		const {language, format, sections} = options

		const selected = sections.map((name) => ({
			name: name,
			section: this.docIndex.sections[getSectionKey(language, format, name)],
		}))

		return selected
	}

	async saveSections(
		options: {
			language: DocLanguage
			format: Slug
			section: Section
		}[],
	) {
		if (!this.bridge) {
			return
		}
		const bridge = this.bridge
		await Promise.all(options.map((data) => bridge.saveSection(data)))
		// Save Block to OPFS
		// Block data is saved within the section file

		this.loadDocStore()
	}

	/**
	 * @param options section metadata
	 */
	async createSection(options: {
		name: Slug
		title?: string
		rank: Rank
		formats: Slug[]
		languages: DocLanguage[]
		updateRanks: Section[]
	}): Promise<{id: string} | void> {
		if (!this.bridge) {
			return
		}

		const {languages, updateRanks} = options
		// Check if an existing section's rank is affected

		for (const language of languages) {
			await this.bridge.createSection({
				...options,
				language,
				updateRanks,
			})
		}

		this.loadDocStore()
	}

	/**
	 * @param options section metadata
	 */
	updateSubsections(options: {
		group: string
		block: Block // Block to update / create
		section: Section
	}): Subsection[] {
		const {section, group, block} = options
		let subsections = section.subsections

		if (!subsections) {
			const subsection = {
				name: group,
				parent: section.name,
				rank: 1,
				blocks: [block],
			}
			subsections = [subsection]
		} else {
			const subsection = subsections.find((s) => s.name === group)
			if (subsection) {
				subsection.blocks.push(block)
			} else {
				const subsection = {
					name: group,
					parent: section.name,
					rank: 1,
					blocks: [block],
				}
				subsections.push(subsection)
			}
		}

		return subsections
	}

	/**
	 * Load full doc tree from storage
	 */
	async loadDocStore(): Promise<DocStore> {
		if (!this.bridge) {
			return this.content
		}

		// Raw content retrieved from OPFS "as is"
		// 2 files are read:
		// - content.json // Has Section shaped data FIXME: not always : se RawSection type
		// - meta.json // Has DocMeta shaped data FIXME: not always : se RawSection type
		const raw = (await this.bridge.getAllDocs()) as OPFSTreeDoc

		this.content = opfsDocTreeToDocStore(raw)

		return this.content
	}
}
