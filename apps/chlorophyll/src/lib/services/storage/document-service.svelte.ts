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
	Preset,
	DocumentStore,
	PresetStore,
	DocumentIndex,
	PresetIndex,
	OPFSDocumentTree,
	OPFSPresetTree,
	FrontmatterStructure,
	FrontmatterBase,
	OPFSBaseTree,
	OPFSStructureTree,
	DocContentType,
} from '$types'

import {PUBLIC_DOCUMENT_LANGUAGE, PUBLIC_DOCUMENT_FORMAT} from '$app/env/public'

import WorkerBridge from '$lib/workers/worker-bridge'
import {getBridge} from '$lib/services/storage/bridge'

import {getSectionKey, getBlockKey, getPresetKey} from '$lib/common/format'

import {
	opfsBaseTreeToFrontmatterBase,
	opfsDocumentTreeToDocumentStore,
	opfsPresetTreeToPresetStore,
	opfsStructureTreeToFrontmatterStructures,
} from '$lib/common/transform/opfs-to-document'

import {
	buildDocumentIndex,
	buildPresetIndex,
} from '$lib/common/transform/store-to-index'

/**
 * StorageService class to manage access to stored content
 * Maintains a cache of data in memory
 * Sends/receive messages via worker bridge
 */
export default class DocumentService {
	bridge: WorkerBridge | undefined = $state()
	loading = $state(false)
	error = $state(false)
	base: FrontmatterBase = $state({
		schema_version: '0.1',
		languages: [PUBLIC_DOCUMENT_LANGUAGE as DocLanguage],
		formats: [PUBLIC_DOCUMENT_FORMAT as DocFormat],
		tags: [],
		settings: [],
	})
	structures: FrontmatterStructure[] = $state([])
	content: DocumentStore = $state({})
	presets: PresetStore = $state({})
	documentIndex: DocumentIndex = $derived(buildDocumentIndex(this.content))
	presetIndex: PresetIndex = $derived(buildPresetIndex(this.presets))
	blockEditorsLoaded: {[name: string]: Block} = $state({})
	sectionEditorsLoaded: {[name: string]: Section} = $state({})

	export = $state({
		type: 'doc-root',
		meta: {},
		data: '',
	})
	import = $state('')

	constructor() {
		this.loading = true
	}

	async init() {
		this.bridge = getBridge()
		try {
			this.loading = true

			await this.getAllDocuments()
			await this.getAllPresets()
			await this.getDocumentBase()
			await this.getDocumentStructure()
		} catch {
			this.error = true
		} finally {
			this.loading = false
		}
	}

	reset() {
		this.content = {}
		this.presets = {}
		this.base = {
			schema_version: '0.1',
			languages: [PUBLIC_DOCUMENT_LANGUAGE as DocLanguage],
			formats: [PUBLIC_DOCUMENT_FORMAT as DocFormat],
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
		// - For UI reactivity: documentIndex re-derives automatically
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
		const maxRank = Object.keys(this.documentIndex.sections).length

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
			section:
				this.documentIndex.sections[getSectionKey(language, format, name)],
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
				this.documentIndex.blocks[
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

		return this.documentIndex.sections[getSectionKey(language, format, name)]
	}

	/**
	 * Get selected section by name for given [language*format]
	 * @param options language, format and name to match
	 * @returns section
	 */
	getSectionById(id: Uuid): Section {
		return this.documentIndex.sectionsById[id]
	}

	/**
	 * Get sections per [language*format] for given rank
	 * @param rank
	 * @returns sections found
	 */
	getSectionsByRank(rank: Rank): Section[] {
		const sections = Object.values(this.documentIndex.sections)
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

		return this.documentIndex.blocks[
			getBlockKey(language, format, section, name, subsection)
		]
	}

	loadBlock(
		dataset: {block?: string; section?: string; subsection?: string},
		language: DocLanguage,
		format: DocFormat,
		name: Slug,
	) {
		if (!dataset.section || !dataset.block) {
			return
		}

		if (this.blockEditorsLoaded[dataset.block]) {
			return
		}

		if (dataset.block === dataset.section) {
			this.sectionEditorsLoaded[dataset.block] = this.getSectionByName({
				language,
				format,
				name,
			})
		} else {
			this.blockEditorsLoaded[dataset.block] = this.getBlock({
				language,
				format,
				section: dataset.section as Slug,
				name: dataset.block,
				subsection: dataset.subsection,
			})
		}
	}

	/**
	 * Get selected presets for given [language*format]
	 * @param options section selection to load, blocks to load within presets
	 * @returns filtered presets array with filtered blocks
	 */
	getIndexedPresets(options: {
		presets: string[]
	}): {name: string; preset: Preset}[] {
		const {presets} = options

		const selected = presets.map((name) => ({
			name: name,
			preset: this.presetIndex.presets[getPresetKey(name)],
		}))

		return selected
	}

	/**
	 * Load full document tree from storage
	 */
	async getDocumentBase() {
		if (!this.bridge) return

		// Raw content retrieved from OPFS "as is"
		// 2 files are read:
		// - content.json // Has FrontmatterBase shaped data FIXME: not always : se RawFrontmatterBase type
		// - meta.json // Has DocMeta shaped data FIXME: not always : see RawSection type
		const raw = (await this.bridge.getDocumentBase()) as OPFSBaseTree

		this.base = opfsBaseTreeToFrontmatterBase(raw)
	}

	/**
	 * Load full document tree from storage
	 */
	async getDocumentStructure() {
		if (!this.bridge) return

		// Raw content retrieved from OPFS "as is"
		// 2 files are read:
		// - content.json // Has FrontmatterBase shaped data FIXME: not always : se RawFrontmatterBase type
		// - meta.json // Has DocMeta shaped data FIXME: not always : see RawSection type
		const raw = (await this.bridge.getDocumentStructure()) as OPFSStructureTree

		this.structures = opfsStructureTreeToFrontmatterStructures(raw)
	}

	/**
	 * Load full document tree from storage
	 */
	async getAllDocuments() {
		if (!this.bridge) return

		// Raw content retrieved from OPFS "as is"
		// 2 files are read:
		// - content.json // Has Section shaped data FIXME: not always : se RawSection type
		// - meta.json // Has DocMeta shaped data FIXME: not always : se RawSection type
		const raw = (await this.bridge.getAllDocuments()) as OPFSDocumentTree

		this.content = opfsDocumentTreeToDocumentStore(raw)
	}

	/**
	 * Delete all content and presets from OPFS storage
	 * @returns void
	 */
	async deleteAllContent(): Promise<void> {
		if (!this.bridge) {
			return
		}

		await this.bridge.deleteAll()
		this.reset()
	}

	/**
	 * Get preset by name
	 * @param name
	 */
	getPreset(name: string): Preset {
		return this.presetIndex.presets[getPresetKey(name)]
	}

	/**
	 * Save preset
	 * @param meta preset metadata to update (save or create)
	 * @param content { query: string } preset query
	 */
	async savePreset(options: {
		path: DocPath
		meta: DocMeta
		preset: {id?: Uuid; name: string; query: string}
	}) {
		if (!this.bridge) {
			return
		}

		const {path, meta, preset} = options

		const toUpdate: Preset = {...preset, id: preset.id ?? crypto.randomUUID()}

		await this.bridge.savePreset({
			path,
			meta,
			preset: toUpdate,
		})

		this.presets[options.preset.name] = toUpdate
		this.presetIndex.presets[getPresetKey(toUpdate.name)] = toUpdate
	}

	/**
	 * Delete preset
	 * @param meta metadata of preset to delete
	 */
	async deletePreset(options: {path: DocPath; meta: DocMeta}) {
		if (!this.bridge) {
			return
		}

		const raw = (await this.bridge.deletePreset(options)) as {deleted: boolean}

		if (raw.deleted) {
			delete this.presets[options.meta.name]
			delete this.presetIndex.presets[getPresetKey(options.meta.name)]
		}
	}

	/**
	 * Load all presets for nav display
	 */
	async getAllPresets() {
		if (!this.bridge) {
			return
		}

		const raw = (await this.bridge.getAllPresets()) as OPFSPresetTree
		this.presets = opfsPresetTreeToPresetStore(raw)
	}

	/**
	 * Load all presets for nav display
	 */
	loadPresets(): Record<string, Preset> {
		return this.presetIndex.presets
	}

	/**
	 * Lock preset to prevent accidental editing / deleting
	 * @param meta preset metadata to update (save or create)
	 * @param content { query: string } preset query
	 */
	async togglePresetLock(options: {
		path: DocPath
		meta: DocMeta
		preset: {id?: Uuid; name: string; query: string}
	}) {
		if (!this.bridge) {
			return
		}

		const {path, meta, preset} = options

		const toUpdate: Preset = {...preset, id: preset.id ?? crypto.randomUUID()}

		toUpdate.locked = !toUpdate.locked

		await this.bridge.savePreset({
			path,
			meta,
			preset: toUpdate,
		})

		this.presets[options.preset.name] = toUpdate
		this.presetIndex.presets[getPresetKey(toUpdate.name)] = toUpdate
	}
}
