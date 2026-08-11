import type {
	Block,
	DocContentType,
	DocFormat,
	DocLanguage,
	DocMeta,
	DocPath,
	FrontmatterBase,
	FrontmatterStructure,
	Prose,
	Rank,
	Section,
	Slug,
	Uuid,
	Doc,
} from '$types'

export type DocumentStore = {
	[language in DocLanguage]?: {
		[format in DocFormat]?: Doc
	}
}

export interface DocumentIndex {
	sections: Record<string, Section> // keyed by sectionKey = [group.tag]
	sectionsById: Record<string, Section> // keyed by id
	subsections: Record<
		string,
		{
			name: string
			parent: string
			rank: number
			blocks: Block[]
		}
	> // keyed by name
}

export interface IDocumentService {
	readonly loading: boolean
	readonly error: boolean
	readonly base: FrontmatterBase
	readonly structures: FrontmatterStructure[]
	readonly content: DocumentStore
	readonly documentIndex: DocumentIndex
	readonly blockEditorsLoaded: {[name: string]: Block}
	readonly sectionEditorsLoaded: {[name: string]: Section}

	init(): Promise<void>

	reset(): void

	getProse(options: {path: DocPath; meta: DocMeta}): Promise<Prose | undefined>

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
		format: DocFormat
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
		formats: DocFormat[]
	}): Promise<{id: string} | void>

	getSelectedSections(options: {
		language: DocLanguage
		format: DocFormat
		sections: Slug[]
	}): {name: Slug; section: Section}[]

	getSelectedBlocks(options: {
		language: DocLanguage
		format: DocFormat
		section: Slug
		blocks: string[]
		subsection?: string
	}): {name: string; block: Block}[]

	getSectionByName(options: {
		language: DocLanguage
		format: DocFormat
		name: Slug
	}): Section

	getSectionById(id: Uuid): Section

	getSectionsByRank(rank: Rank): Section[]

	getBlock(options: {
		language: DocLanguage
		format: DocFormat
		section: Slug
		name: string
		subsection?: string
	}): Block

	lazyLoadBlock(
		dataset: {block?: string; section?: string; subsection?: string},
		language: DocLanguage,
		format: DocFormat,
		name: Slug,
	): void
}
