import type {
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
	DocStatus,
} from '$types'

import {updateSectionRanks} from '$lib/common/transform/operations-block'
import {getSectionKey} from '$lib/common/format'

/**
 * CoordinateDocs class to manage access to stored docs
 * Maintains a cache of data in memory
 * Sends/receive messages via worker bridge
 */
export default class CoordinateDocs implements ICoordinateDocs {
	aggMetadata: IAggregateMetadata
	aggDocs: IAggregateDocs
	status: DocStatus
	errors: {code: Slug; message: string}[] = $state([])
	lazyBlocks: {[name: string]: Block} = $state({})
	lazySections: {[name: string]: Section} = $state({})

	constructor(aggMetadata: IAggregateMetadata, aggDocs: IAggregateDocs) {
		this.status = 'idle'
		this.aggMetadata = aggMetadata
		this.aggDocs = aggDocs
	}

	reset() {
		this.status = 'idle'
		this.lazyBlocks = {}
		this.lazySections = {}
	}

	isLoading() {
		return this.status === 'loading'
	}

	hasError() {
		return this.status === 'error'
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

		this.status = 'loading'

		try {
			if (dataset.block === dataset.section) {
				const sectionKey = getSectionKey(language, format, name)

				this.lazySections[dataset.block] =
					this.aggDocs.getSectionByKey(sectionKey)
			} else {
				this.lazyBlocks[dataset.block] = this.aggDocs.getBlock({
					language,
					format,
					section: dataset.section as Slug,
					name: dataset.block,
					subsection: dataset.subsection,
				})
			}

			this.status = 'ready'
		} catch {
			this.status = 'error'
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

		this.aggDocs.loadDocStore()
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

		this.aggDocs.loadDocStore()
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

		this.aggDocs.loadDocStore()
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
	}): Section | void {
		const {language, format, name} = options
		const sectionKey = getSectionKey(language, format, name)
		this.status = 'loading'

		try {
			const section = this.aggDocs.getSectionByKey(sectionKey)
			this.lazySections[name] = section

			this.status = 'ready'

			return section
		} catch {
			this.status = 'error'
		}
	}

	/**
	 * Get all sections
	 * @param options section selection to load, blocks to load within sections
	 * @returns Array: {name, section}[]
	 */
	getSections(options: {language: DocLanguage; format: Slug}): Section[] {
		this.status = 'loading'
		let sections: Section[] = []

		try {
			sections = this.aggDocs.getSections(options)

			this.status = 'ready'
		} catch {
			this.status = 'error'
		}

		return sections
	}

	/**
	 * Get all sections
	 * @param options section selection to load, blocks to load within sections
	 * @returns Array: {name, section}[]
	 */
	getSectionsByName(options: {
		language: DocLanguage
		format: Slug
		names: Slug[]
	}): Section[] {
		this.status = 'loading'
		const {language, format, names} = options
		const sections: Section[] = []

		try {
			for (const name of names) {
				const section = this.getSectionByName({language, format, name})

				if (!section) {
					this.errors.push({
						code: name, // TODO: find a better way to do this
						message: `Section ${name} not found for [${language} * ${format}]`,
					})
				} else {
					sections.push(section)
				}
			}

			this.status = 'ready'
		} catch {
			this.status = 'error'
		}

		return sections
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

		this.aggDocs.loadDocStore()
	}
}
