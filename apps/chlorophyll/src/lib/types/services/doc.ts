import type {
	Block,
	Doc,
	DocContentType,
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
} from '$types'

export type DocStore = {
	[language in DocLanguage]?: {
		[format in Slug]?: Doc
	}
}

export interface DocIndex {
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
	blocks: Record<string, Block>
}

export interface IDocService {
	readonly loading: boolean
	readonly error: boolean
	readonly base: FrontmatterBase
	readonly structures: FrontmatterStructure[]
	readonly content: DocStore
	readonly docIndex: DocIndex
	readonly lazyBlocks: {[name: string]: Block}
	readonly lazySections: {[name: string]: Section}

	init(): Promise<void>

	reset(): void

	addLanguage(options: {
		name: DocLanguage
		sourceLanguage?: DocLanguage
	}): Promise<void>

	addFormat(options: {name: Slug; sourceFormat: Slug}): Promise<void>

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

	getSelectedSections(options: {
		language: DocLanguage
		format: Slug
		sections: Slug[]
	}): {name: Slug; section: Section}[]

	getSectionByName(options: {
		language: DocLanguage
		format: Slug
		name: Slug
	}): Section

	getSectionById(id: Uuid): Section

	getSectionsByRank(rank: Rank): Section[]

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
