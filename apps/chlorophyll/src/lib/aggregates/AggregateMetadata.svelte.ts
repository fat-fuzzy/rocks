import type {
	Slug,
	DocLanguage,
	FrontmatterStructure,
	FrontmatterBase,
	OPFSTreeBase,
	OPFSTreeStructure,
	IAggregateMetadata,
	TagGroup,
	Rank,
} from '$types'

import {DOC_LANGUAGE, DOC_FORMAT} from '$config/setup'
import {SCHEMA_VERSION} from '$config/setup'

import WorkerBridge from '$lib/workers/worker-bridge'
import {getBridge} from '$lib/aggregates/bridge'

import {
	opfsBaseTreeToFrontmatterBase,
	opfsStructureTreeToFrontmatterStructures,
} from '$lib/common/transform/opfs-to-doc'

/**
 * AggregateMetadata class to manage access to stored docs
 * Maintains a cache of data in memory
 * Sends/receive messages via worker bridge
 */
export default class AggregateMetadata implements IAggregateMetadata {
	bridge: WorkerBridge | undefined = $state()
	loading = $state(false)
	error = $state(false)
	base: FrontmatterBase = $state({
		schema_version: SCHEMA_VERSION,
		languages: [DOC_LANGUAGE as DocLanguage],
		formats: [DOC_FORMAT as Slug],
		tags: [],
		settings: [],
	})
	structures: FrontmatterStructure[] = $state([])

	constructor() {
		this.loading = true
	}

	async init() {
		this.bridge = getBridge()
		try {
			this.loading = true

			await this.loadBase()
			await this.loadStructure()
		} catch {
			this.error = true
		} finally {
			this.loading = false
		}
	}

	reset() {
		this.base = {
			schema_version: SCHEMA_VERSION,
			languages: [DOC_LANGUAGE as DocLanguage],
			formats: [DOC_FORMAT as Slug],
			tags: [],
			settings: [],
		}
		this.structures = []
	}

	/**
	 * Add a new language
	 * @param options
	 * @returns the new language name
	 */

	async addLanguage(options: {
		name: DocLanguage
		sourceLanguage: DocLanguage
	}): Promise<void> {
		if (!this.bridge) {
			return
		}
		const {name, sourceLanguage} = options

		await this.bridge.saveLanguage({
			language: name,
			sourceLanguage,
			formats: JSON.parse(JSON.stringify(this.base.formats)),
		})

		this.base.languages.push(name)

		await this.bridge.saveBase({base: JSON.parse(JSON.stringify(this.base))})

		await this.loadBase()
	}

	/**
	 * Add a new format
	 * @param options
	 * @returns the new format name
	 */

	async addFormat(options: {name: Slug; sourceFormat: Slug}): Promise<void> {
		if (!this.bridge) {
			return
		}
		const {name, sourceFormat} = options

		await this.bridge.saveFormat({
			format: name,
			sourceFormat,
			formats: JSON.parse(JSON.stringify(this.base.formats)),
			languages: JSON.parse(JSON.stringify(this.base.languages)),
		})

		this.base.formats.push(name)

		await this.bridge.saveBase({base: JSON.parse(JSON.stringify(this.base))})

		await this.loadBase()
	}

	/**
	 * Load full doc tree from storage
	 */
	getLanguages() {
		return this.base.languages
	}

	/**
	 * Load full doc tree from storage
	 */
	getFormats() {
		return this.base.formats
	}

	/**
	 * Load full doc tree from storage
	 */
	getTagGroups() {
		return this.base.tags
	}

	/**
	 * Load full doc tree from storage
	 */
	getTagGroupByName(name: Slug): TagGroup | undefined {
		return this.base.tags.find((tg) => tg.name === name)
	}

	/**
	 * Load full doc tree from storage
	 */
	async loadBase() {
		if (!this.bridge) return

		// Raw content retrieved from OPFS "as is"
		// 2 files are read:
		// - content.json // Has FrontmatterBase shaped data FIXME: not always : se RawFrontmatterBase type
		// - meta.json // Has DocMeta shaped data FIXME: not always : see RawSection type
		const raw = (await this.bridge.getDocBase()) as OPFSTreeBase

		this.base = opfsBaseTreeToFrontmatterBase(raw)
	}

	/**
	 * Load full doc tree from storage
	 */
	async loadStructure() {
		if (!this.bridge) return

		// Raw content retrieved from OPFS "as is"
		// 2 files are read:
		// - content.json // Has FrontmatterBase shaped data FIXME: not always : se RawFrontmatterBase type
		// - meta.json // Has DocMeta shaped data FIXME: not always : see RawSection type
		const raw = (await this.bridge.getDocStructure()) as OPFSTreeStructure

		const structures = opfsStructureTreeToFrontmatterStructures(raw)
		this.structures = structures
	}

	/**
	 * Load full doc tree from storage
	 */
	async updateDocStructureSections(options: {
		name: Slug
		title?: string
		rank: Rank
		formats: Slug[]
	}) {
		if (!this.bridge) return

		const {name, rank, formats} = options

		for (const format of formats) {
			const structureToUpdate = this.structures.find((s) => s.format === format)

			if (structureToUpdate) {
				// Insert section at rank
				// TODO: stricter conditions
				if (rank >= structureToUpdate.sections.length) {
					structureToUpdate.sections.push(name)
				} else if (rank <= 1) {
					structureToUpdate.sections.unshift(name)
				} else {
					const precedingSections = structureToUpdate.sections.splice(
						0,
						rank - 1,
					)
					precedingSections.push(name)
					structureToUpdate.sections = precedingSections.concat(
						structureToUpdate.sections,
					)
				}
			}
		}

		await this.updateDocStructures(formats)
	}

	/**
	 * Load full doc tree from storage
	 */
	async updateDocStructures(formats: Slug[]) {
		if (!this.bridge) return

		const structuresToUpdate: FrontmatterStructure[] = []
		for (const format of formats) {
			const structureToUpdate = this.structures.find((s) => s.format === format)
			if (structureToUpdate) {
				structuresToUpdate.push(structureToUpdate)
			}
		}

		await this.bridge.saveStructures({
			structures: JSON.parse(JSON.stringify(structuresToUpdate)),
		})

		await this.loadStructure()
	}
}
