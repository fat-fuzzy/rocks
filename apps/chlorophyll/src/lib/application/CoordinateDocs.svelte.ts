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
	DocContentType,
	ICoordinateDocs,
	IAggregateDocs,
	IAggregateMetadata,
} from '$types'

import {updateSectionRanks} from '$lib/common/transform/operations-block'

/**
 * CoordinateDocs class to manage access to stored docs
 * Maintains a cache of data in memory
 * Sends/receive messages via worker bridge
 */
export default class CoordinateDocs implements ICoordinateDocs {
	aggMetadata: IAggregateMetadata
	aggDocs: IAggregateDocs
	loading = $state(false)
	error = $state(false)
	lazyBlocks: {[name: string]: Block} = $state({})
	lazySections: {[name: string]: Section} = $state({})

	constructor(aggMetadata: IAggregateMetadata, aggDocs: IAggregateDocs) {
		this.aggMetadata = aggMetadata
		this.aggDocs = aggDocs
	}

	reset() {
		this.loading = false
		this.error = false
		this.lazyBlocks = {}
		this.lazySections = {}
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
		await this.aggMetadata.addLanguage(options)
		await this.aggMetadata.loadBase()
	}

	/**
	 * Add a new format
	 * @param options
	 * @returns the new format name
	 */

	async addFormat(options: {name: Slug; sourceFormat: Slug}): Promise<void> {
		await this.aggMetadata.addFormat(options)
		await this.aggMetadata.loadBase()
	}

	/**
	 * Retrieve prose content content from store
	 * @param path metadata to retrieve file
	 * @param meta content metadata
	 * @returns Prose content or undefined (on Promise resolve)
	 */

	getProse(options: {
		path: DocPath
		meta: DocMeta
	}): Promise<Prose | undefined> {
		return this.aggDocs.getProse(options)
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
		return this.aggDocs.getBlock(options)
	}

	lazyLoadBlock(
		dataset: {block?: string; section?: string; subsection?: string},
		language: DocLanguage,
		format: Slug,
		name: Slug,
	) {
		if (!dataset.section || !dataset.block) {
			return
		}

		if (this.lazyBlocks[dataset.block]) {
			return
		}
		if (dataset.block === dataset.section) {
			this.lazySections[dataset.block] = this.aggDocs.getSectionByName({
				language,
				format,
				name,
			})
		} else {
			this.lazyBlocks[dataset.block] = this.aggDocs.getBlock({
				language,
				format,
				section: dataset.section as Slug,
				name: dataset.block,
				subsection: dataset.subsection,
			})
		}
	}

	getSectionMaxRank(options: {language: DocLanguage; format: Slug}): number {
		const {language, format} = options
		const languageTree = this.aggDocs.content[language]

		if (!languageTree) {
			return 1
		}

		const docTree = languageTree[format]

		if (!docTree) {
			return 1
		}

		return docTree.sections.length + 1
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
		const languages = this.aggMetadata.base.languages
		const formats = this.aggMetadata.base.formats

		// TODO: enable optional format selection
		for (const language of languages) {
			for (const format of formats) {
				await this.aggDocs.createBlockForLanguageAndFormat({
					...options,
					language,
					format,
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
		format: Slug
		block: Block
		path: DocPath
	}): Promise<{id: string} | void> {
		await this.aggDocs.saveBlock(options)
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
	}): Promise<{id: string} | void> {
		const languages = this.aggMetadata.base.languages
		const formats = this.aggMetadata.base.formats

		await this.aggDocs.deleteBlock({...options, languages, formats})
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
		return this.aggDocs.getSectionByName(options)
	}

	/**
	 * Get selected section by name for given [language*format]
	 * @param options language, format and name to match
	 * @returns section
	 */
	getSectionById(id: Uuid): Section {
		return this.aggDocs.getSectionById(id)
	}

	/**
	 * Get sections per [language*format] for given rank
	 * @param rank
	 * @returns sections found
	 */
	getSectionsByRank(rank: Rank): Section[] {
		return this.aggDocs.getSectionsByRank(rank)
	}

	/**
	 * Get all sections
	 * @param options section selection to load, blocks to load within sections
	 * @returns Array: {name, section}[]
	 */
	getSections(options: {language: Slug; format: DocLanguage}): Section[] {
		return this.aggDocs.getSections(options)
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
		return this.aggDocs.getSelectedSections(options)
	}

	/**
	 * @param options section metadata
	 */
	async createSection(options: {
		name: Slug
		title?: string
		rank: Rank
		formats: Slug[]
	}): Promise<{id: string} | void> {
		const {rank} = options

		const languages = this.aggMetadata.base.languages
		const updateRanks: Section[] = updateSectionRanks({
			rank,
			docIndex: this.aggDocs.docIndex,
		})

		await this.aggDocs.createSection({
			...options,
			formats: JSON.parse(JSON.stringify(options.formats)),
			languages: JSON.parse(JSON.stringify(languages)),
			updateRanks,
		})

		await this.aggMetadata.updateDocStructureSections(options)
	}
}
