import type {
	Block,
	DocContentType,
	DocLanguage,
	DocMeta,
	DocPath,
	IAggregateDocs,
	IAggregateMetadata,
	Prose,
	Rank,
	Section,
	Slug,
} from '$types'

export interface ICoordinateDocs {
	readonly aggMetadata: IAggregateMetadata
	readonly aggDocs: IAggregateDocs | undefined
	readonly lazyBlocks: {[name: string]: Block}
	readonly lazySections: {[name: string]: Section}

	reset(): void

	getProse(options: {path: DocPath; meta: DocMeta}): Promise<Prose | undefined>

	isLoading(): boolean

	hasError(): boolean

	createBlock(options: {
		name: Slug
		title?: string
		group?: string
		rank: Rank
		parent: Slug
		tags: string[]
	}): Promise<{id: string} | void>

	saveBlock(options: {
		language: DocLanguage
		format: Slug
		block: Block
		path: DocPath
	}): Promise<{id: string} | void>

	deleteBlock(options: {
		name: Slug
		content_type: DocContentType
		group?: string
		parent?: Slug
	}): Promise<{id: string} | void>

	createSection(options: {
		name: Slug
		title?: string
		rank: Rank
		formats: Slug[]
	}): Promise<{id: string} | void>

	getSections({
		language,
		format,
	}: {
		language: Slug
		format: DocLanguage
	}): Section[]

	getSectionByName(options: {
		language: DocLanguage
		format: Slug
		name: Slug
	}): Section | void

	getSectionsByName(options: {
		language: DocLanguage
		format: Slug
		names: Slug[]
	}): Section[]

	getSectionMaxRank(options: {language: DocLanguage; format: Slug}): number

	getBlock(options: {
		language: DocLanguage
		format: Slug
		section: Slug
		name: string
		subsection?: string
	}): Block

	lazyLoadBlock(
		dataset: {block?: string; section?: string; subsection?: string},
		language: DocLanguage,
		format: Slug,
		name: Slug,
	): void
}
