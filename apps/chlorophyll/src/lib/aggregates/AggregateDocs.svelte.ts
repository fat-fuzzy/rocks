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
} from '$types'

import WorkerBridge from '$lib/workers/worker-bridge'
import {getBridge} from '$lib/aggregates/bridge'

import {SCHEMA_VERSION} from '$config/setup'
import {sortByRankAsc} from '$lib/common/sort'
import {getSectionKey, getBlockKey} from '$lib/common/format'
import {opfsDocTreeToDocStore} from '$lib/common/transform/opfs-to-doc'
import {buildDocIndex} from '$lib/common/transform/store-to-index'
import {
	updateBlockInSection,
	deleteBlockInSection,
} from '$lib/common/transform/operations-block'

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
			section: $state.snapshot(section),
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
			section: $state.snapshot(sectionToUpdate),
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
	 * Remove tags from blocks
	 * @param options {
		block: Block
		toUpdate: {name: Slug; items: Slug[]}
		language: DocLanguage
		format: Slug
		}
	 * @returns 
	 */
	async untagBlocks(options: {
		blocks: Block[]
		toUpdate: {name: Slug; items: Slug[]}
		language: DocLanguage
		format: Slug
	}): Promise<{name: Slug; items: Slug[]} | void> {
		if (!this.bridge) {
			return
		}

		const {blocks, toUpdate, language, format} = options

		const sectionsToUpdate: {
			language: string
			format: string
			section: Section
		}[] = []

		const languageTree = this.content[language]

		if (!languageTree) {
			// TEST: We should not get here
			return
		}

		const docTree = languageTree[format]

		if (!docTree) {
			// TEST: We should not get here
			return
		}

		for (const block of blocks) {
			const sectionDataFound = sectionsToUpdate.find(
				(data) => data.section.id === block.parentId,
			)

			let sectionToUpdate

			if (!sectionDataFound) {
				const section = this.getSectionById(block.parentId)

				if (section) {
					const sectionFound = docTree.sections.find(
						(s) => s.name === section.name,
					)

					if (sectionFound) {
						sectionToUpdate = $state.snapshot(sectionFound)
					}
				}
			}

			if (!sectionToUpdate) {
				continue
			}

			const updated = this.untagSection({
				section: sectionToUpdate,
				toUpdate,
			})

			if (updated) {
				sectionsToUpdate.push({
					language,
					format,
					section: $state.snapshot(updated),
				})
			}
		}
		await this.saveSections(sectionsToUpdate)

		await this.loadDocStore()
	}

	/**
	 * Remove tags from section
	 * @param options {
		section: Section
		toUpdate: {name: Slug; items: Slug[]}
		}
	 * @returns updated Section
	 */
	untagSection(options: {
		section: Section
		toUpdate: {name: Slug; items: Slug[]}
	}): Section | void {
		if (!this.bridge) {
			return
		}

		const {section, toUpdate} = options

		const sectionToUpdate: Section = {...section, subsections: []}

		if (section.tags) {
			sectionToUpdate.tags = section.tags.filter(
				(t) => !toUpdate.items.includes(t),
			)

			if (sectionToUpdate.tags.length === 0) {
				sectionToUpdate.tags = ['untagged']
			}
		}

		if (section.subsections) {
			sectionToUpdate.subsections = []

			for (const sub of section.subsections) {
				const subsection = {...sub}
				subsection.blocks = []

				for (const block of sub.blocks) {
					block.tags = block.tags.filter((t) => !toUpdate.items.includes(t))

					if (block.tags.length === 0) {
						block.tags = ['untagged']
					}

					subsection.blocks.push(block)
				}

				sectionToUpdate.subsections.push(subsection)
			}
		}

		return sectionToUpdate
	}

	/**
	 * Get selected section by name for given [language * format]
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
	 * Get selected section by id for given [language * format]
	 * @param options id to match
	 * @returns section
	 */
	getSectionById(id: Uuid): Section {
		return this.docIndex.sectionsById[id]
	}

	/**
	 * Get all sections for given [language * format]
	 * @param options language and format query params
	 * @returns array of sections found in storage
	 */
	getSections(options: {language: Slug; format: DocLanguage}): Section[] {
		const languageTree = this.content[options.language]
		if (!languageTree) {
			return []
		}

		const sectionsFound = languageTree[options.format]

		if (!sectionsFound) {
			return []
		}

		const result = [...sectionsFound.sections].sort(sortByRankAsc)

		return result
	}

	/**
	 * Get selected sections for given [language * format * names]
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
