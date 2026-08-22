import type {
	Block,
	Doc,
	DocContentType,
	DocLanguage,
	DocMeta,
	DocPath,
	Prose,
	Rank,
	Section,
	Slug,
	TagGroup,
	TagIndex,
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

export interface IAggregateDocs {
	readonly loading: boolean
	readonly error: boolean
	readonly content: DocStore
	readonly docIndex: DocIndex

	init(): Promise<void>

	reset(): void

	getProse(options: {path: DocPath; meta: DocMeta}): Promise<Prose | undefined>

	saveBlock(options: {
		language: DocLanguage
		format: Slug
		block: Block
		path: DocPath
	}): Promise<{id: string} | void>

	createBlockForLanguageAndFormat(options: {
		name: Slug
		title?: string
		group?: string
		rank: Rank
		parent: Slug
		tags: string[]
		language: DocLanguage
		format: Slug
	}): Promise<{id: string} | void>

	deleteBlock(options: {
		name: Slug
		content_type: DocContentType
		group?: string
		parent?: Slug
		languages: DocLanguage[]
		formats: Slug[]
	}): Promise<{id: string} | void>

	untagBlocks(options: {
		group: TagGroup
		tagIndex: TagIndex
		languages: DocLanguage[]
		formats: Slug[]
	}): Promise<TagGroup | void>

	createSection(options: {
		name: Slug
		title?: string
		rank: Rank
		formats: Slug[]
		languages: DocLanguage[]
		updateRanks: Section[]
	}): Promise<{id: string} | void>

	saveSections(
		options: {
			language: DocLanguage
			format: Slug
			section: Section
		}[],
	): Promise<{id: string} | void>

	getSections({
		language,
		format,
	}: {
		language: Slug
		format: DocLanguage
	}): Section[]

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

	loadDocStore(): Promise<DocStore>
}
