import type {
	DocLanguage,
	FrontmatterBase,
	FrontmatterStructure,
	Rank,
	Slug,
	TagGroup,
} from '$types'

export interface IAggregateMetadata {
	readonly base: FrontmatterBase
	readonly structures: FrontmatterStructure[]
	readonly loading: boolean
	readonly error: boolean
	readonly tagGroups: TagGroup[]

	init(): Promise<void>

	reset(): void

	addLanguage(options: {
		name: DocLanguage
		sourceLanguage: DocLanguage
	}): Promise<void>

	addFormat(options: {name: Slug; sourceFormat: Slug}): Promise<void>

	getTagGroupByName(name: Slug): TagGroup | undefined

	createTag(options: {
		name: Slug
		group: {name: Slug; title: string; type?: string}
	}): Promise<{id: string} | void>

	updateTagGroups(options: {
		groups: {name: Slug; items: string[]}[]
	}): Promise<{id: string} | void>

	loadBase(): Promise<void>

	loadStructure(): Promise<void>

	updateDocStructures(Formats: Slug[]): Promise<void>

	updateDocStructureSections(options: {
		name: Slug
		title?: string
		rank: Rank
		formats: Slug[]
	}): Promise<void>
}
