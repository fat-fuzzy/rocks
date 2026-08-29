import type {Block, DocLanguage, Slug, TagGroup} from '$types'

export interface TagIndex {
	tags: Record<string, string[]> // keyed by group
	taggedBlocks: Record<string, Block[]> //   keyed by tagKey = group:tag
}

export interface ICoordinateMetadata {
	readonly loading: boolean
	readonly error: boolean
	readonly tagIndex: TagIndex

	init(): Promise<void>
	reset(): void

	getLanguages(): DocLanguage[]

	checkLanguageExists(languageName: string): boolean

	addLanguage(options: {
		name: DocLanguage
		sourceLanguage: DocLanguage
	}): Promise<void>

	getFormats(): Slug[]

	checkFormatExists(formatName: string): boolean

	addFormat(options: {name: Slug; sourceFormat: Slug}): Promise<void>

	getTagGroups(): TagGroup[]

	getTagIndex(): TagIndex

	createTag(options: {
		name: Slug
		group: {name: Slug; title: string; type?: string}
	}): Promise<{id: string} | void>

	untagDocs(options: {
		groups: {name: Slug; items: string[]}[]
	}): Promise<TagGroup[]>

	setTagGroups(options: {tagGroups: TagGroup[]}): Promise<{id: string} | void>
}
