import type {
	Uuid,
	Rank,
	Slug,
	DocLanguage,
	DocFormat,
	DocMeta,
	DocPath,
	Section,
	Block,
	Prose,
	DocStore,
	DocIndex,
	OPFSDocTree,
	FrontmatterStructure,
	FrontmatterBase,
	OPFSBaseTree,
	OPFSStructureTree,
	DocContentType,
	IDocService,
} from '$types'

import {PUBLIC_DOC_LANGUAGE, PUBLIC_DOC_FORMAT} from '$app/env/public'

import WorkerBridge from '$lib/workers/worker-bridge'
import {getBridge} from '$lib/services/bridge'

import {getSectionKey, getBlockKey} from '$lib/common/format'

import {
	opfsBaseTreeToFrontmatterBase,
	opfsDocTreeToDocStore,
	opfsStructureTreeToFrontmatterStructures,
} from '$lib/common/transform/opfs-to-doc'

import {buildDocIndex} from '$lib/common/transform/store-to-index'

/**
 * DocService class to manage access to stored docs
 * Maintains a cache of data in memory
 * Sends/receive messages via worker bridge
 */
export default class DocService implements IDocService {
	bridge: WorkerBridge | undefined = $state()
	loading = $state(false)
	error = $state(false)
	base: FrontmatterBase = $state({
		schema_version: '0.1',
		languages: [PUBLIC_DOC_LANGUAGE as DocLanguage],
		formats: [PUBLIC_DOC_FORMAT as DocFormat],
		tags: [],
		settings: [],
	})
	structures: FrontmatterStructure[] = $state([])
	content: DocStore = $state({})
	docIndex: DocIndex = $derived(buildDocIndex(this.content))
	lazyBlocks: {[name: string]: Block} = $state({})
	lazySections: {[name: string]: Section} = $state({})

	constructor() {
		this.loading = true
	}

	async init() {
		this.bridge = getBridge()
		try {
			this.loading = true

			await this.getAllDocs()
			await this.getDocBase()
			await this.getDocStructure()
		} catch {
			this.error = true
		} finally {
			this.loading = false
		}
	}

	reset() {
		this.content = {}
		this.base = {
			schema_version: '0.1',
			languages: [PUBLIC_DOC_LANGUAGE as DocLanguage],
			formats: [PUBLIC_DOC_FORMAT as DocFormat],
			tags: [],
			settings: [],
		}
		this.structures = []
	}

	/**
	 * Retrieve file content from store
	 * @param meta metadata to retrieve file
	 * @returns a Promise that will update when
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
	 * Create a new Block
	 * @param options block metadata and content
	 */
	async createBlock(options: {
		name: Slug
		title?: string
		group?: string
		rank: Rank
		parent: Slug
		tags: string[]
	}): Promise<{id: string} | void> {
		if (!this.bridge) {
			return
		}

		const languages = this.base.languages
		const formats = this.base.formats

		// TODO: enable optional format selection
		// const formats = this.base.formats
		for (const language of languages) {
			for (const format of formats) {
				const doc = this.content[language]?.[format]

				if (!doc) {
					continue // FIXME: user feedback / create doc ?
				}

				const section = doc.sections?.find((s) => s.name === options.parent)

				if (!section) {
					continue
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

					if (!section.subsections) {
						const subsection = {
							name: group,
							parent: section.name,
							rank: 1,
							blocks: [block],
						}
						section.subsections = [subsection]
					} else {
						const subsection = section.subsections.find((s) => s.name === group)
						if (subsection) {
							subsection.blocks.push(block)
						} else {
							const subsection = {
								name: group,
								parent: section.name,
								rank: 1,
								blocks: [block],
							}
							section.subsections.push(subsection)
						}
					}
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
		}
	}

	/**
	 * Save block content
	 * @param options block metadata and content
	 */
	async saveBlock(options: {
		language: DocLanguage
		format: DocFormat
		block: Block
		path: DocPath
	}): Promise<{id: string} | void> {
		if (!this.bridge) {
			return
		}

		const {language, format} = options
		let sectionToUpdate

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

		// 1. If block is not in a group: it is the main content of the section
		if (options.block.content_type === 'section') {
			section.content = options.block.content
			section.tags = options.block.tags

			sectionToUpdate = section
		} else if (section.subsections) {
			// 2. Block is in a group: find the subsection to update
			section.subsections.forEach((subsection) => {
				if (subsection.blocks) {
					const i = subsection.blocks.findIndex(
						(b) => b.id === options.block.id,
					)
					if (i !== -1) {
						subsection.blocks[i] = options.block
						sectionToUpdate = section
					}
				}
			})
		}

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
		parent?: Slug
	}): Promise<{id: string} | void> {
		if (!this.bridge) {
			return
		}

		const languages = this.base.languages
		const formats = this.base.formats

		for (const language of languages) {
			for (const format of formats) {
				const doc = this.content[language]?.[format]

				if (!doc) {
					continue
				}

				const section = doc.sections?.find((s) => s.name === options.parent)

				if (!section) {
					continue
				}

				// FIXME: currently skills groups are assigned the section as the group
				const group = options.group ?? options.parent

				if (group) {
					// Case 1: block belongs to default section group
					if (group === section.name) {
						delete section.content
					}

					// Case 2: block belongs to another section group
					else if (!section.subsections) {
						throw Error(`No groups found for ${section.name}`)
					} else {
						const subsection = section.subsections.find((s) => s.name === group)

						if (subsection) {
							subsection.blocks = subsection.blocks.filter(
								(b) => b.name !== options.name,
							)
						} else {
							throw Error(`Group ${group} for block ${options.name} not found`)
						}
					}
				} else if (options.content_type === 'section' && !options.parent) {
					throw Error('Deleting main section content not allowed')
				}

				// Save Section to OPFS
				await this.bridge.saveSection({
					language,
					format,
					// FIXME: shouldn't have to do this
					section: JSON.parse(JSON.stringify(section)),
				})
			}
		}
	}

	/**
	 * @param options section metadata
	 */
	async createSection(options: {
		name: Slug
		title?: string
		rank: Rank
		formats: DocFormat[]
	}): Promise<{id: string} | void> {
		if (!this.bridge) {
			return
		}

		// Check if an existing section's rank is affected
		let updateRanks: Section[] = []
		const maxRank = Object.keys(this.docIndex.sections).length

		if (options.rank <= 1 || options.rank < maxRank) {
			for (let i = options.rank; i < maxRank; i++) {
				const toUpdate = this.getSectionsByRank(i)
				if (toUpdate.length) {
					updateRanks = updateRanks.concat(JSON.parse(JSON.stringify(toUpdate)))
				}
			}
		}

		await this.bridge.createSection({
			...options,
			updateRanks,
		})
	}

	/**
	 * Get selected sections for given options
	 * @param options section selection to load, blocks to load within sections
	 * @returns Array: {name, section}[]
	 */
	getSelectedSections(options: {
		language: DocLanguage
		format: DocFormat
		sections: Slug[]
	}): {name: Slug; section: Section}[] {
		const {language, format, sections} = options

		const selected = sections.map((name) => ({
			name: name,
			section: this.docIndex.sections[getSectionKey(language, format, name)],
		}))

		return selected
	}

	/**
	 * Get selected blocks for given options
	 * @param options block to load, within section / subsection
	 * @returns Array: {name, block}[]
	 */
	getSelectedBlocks(options: {
		language: DocLanguage
		format: DocFormat
		section: Slug
		blocks: string[]
		subsection?: string
	}): {name: string; block: Block}[] {
		const {language, format, section, blocks, subsection} = options

		const selected = blocks.map((name) => ({
			name: name,
			block:
				this.docIndex.blocks[
					getBlockKey(language, format, section, name, subsection)
				],
		}))

		return selected
	}

	/**
	 * Get selected section by name for given [language*format]
	 * @param options language, format and name to match
	 * @returns section
	 */
	getSectionByName(options: {
		language: DocLanguage
		format: DocFormat
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
	 * Get block for option
	 * @param options block to load, blocks to load within blocks
	 * @returns block
	 */
	getBlock(options: {
		language: DocLanguage
		format: DocFormat
		section: Slug
		name: string
		subsection?: string
	}): Block {
		const {language, format, section, subsection, name} = options

		return this.docIndex.blocks[
			getBlockKey(language, format, section, name, subsection)
		]
	}

	lazyLoadBlock(
		dataset: {block?: string; section?: string; subsection?: string},
		language: DocLanguage,
		format: DocFormat,
		name: Slug,
	) {
		if (!dataset.section || !dataset.block) {
			return
		}

		if (this.lazyBlocks[dataset.block]) {
			return
		}

		if (dataset.block === dataset.section) {
			this.lazySections[dataset.block] = this.getSectionByName({
				language,
				format,
				name,
			})
		} else {
			this.lazyBlocks[dataset.block] = this.getBlock({
				language,
				format,
				section: dataset.section as Slug,
				name: dataset.block,
				subsection: dataset.subsection,
			})
		}
	}

	/**
	 * Load full doc tree from storage
	 */
	async getDocBase() {
		if (!this.bridge) return

		// Raw content retrieved from OPFS "as is"
		// 2 files are read:
		// - content.json // Has FrontmatterBase shaped data FIXME: not always : se RawFrontmatterBase type
		// - meta.json // Has DocMeta shaped data FIXME: not always : see RawSection type
		const raw = (await this.bridge.getDocBase()) as OPFSBaseTree

		this.base = opfsBaseTreeToFrontmatterBase(raw)
	}

	/**
	 * Load full doc tree from storage
	 */
	async getDocStructure() {
		if (!this.bridge) return

		// Raw content retrieved from OPFS "as is"
		// 2 files are read:
		// - content.json // Has FrontmatterBase shaped data FIXME: not always : se RawFrontmatterBase type
		// - meta.json // Has DocMeta shaped data FIXME: not always : see RawSection type
		const raw = (await this.bridge.getDocStructure()) as OPFSStructureTree

		this.structures = opfsStructureTreeToFrontmatterStructures(raw)
	}

	/**
	 * Load full doc tree from storage
	 */
	async getAllDocs() {
		if (!this.bridge) return

		// Raw content retrieved from OPFS "as is"
		// 2 files are read:
		// - content.json // Has Section shaped data FIXME: not always : se RawSection type
		// - meta.json // Has DocMeta shaped data FIXME: not always : se RawSection type
		const raw = (await this.bridge.getAllDocs()) as OPFSDocTree

		this.content = opfsDocTreeToDocStore(raw)
	}
}
