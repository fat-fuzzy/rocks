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

	init(): Promise<void>

	reset(): void

	addLanguage(options: {
		name: DocLanguage
		sourceLanguage: DocLanguage
	}): Promise<void>

	addFormat(options: {name: Slug; sourceFormat: Slug}): Promise<void>

	getLanguages(): DocLanguage[]

	getFormats(): Slug[]

	getTagGroups(): TagGroup[]

	getTagGroupByName(name: Slug): TagGroup | undefined

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
