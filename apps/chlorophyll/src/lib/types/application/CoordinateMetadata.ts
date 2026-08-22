import type {Block, Slug, TagGroup} from '$types'

export interface TagIndex {
	tags: Record<string, string[]> // keyed by group
	taggedBlocks: Record<string, Block[]> //   keyed by tagKey = group:tag
}

export interface ICoordinateMetadata {
	readonly loading: boolean
	readonly error: boolean

	init(): Promise<void>
	reset(): void

	getTagGroups(): TagGroup[]

	getTagIndex(): TagIndex

	deleteTags(options: {
		groups: {name: Slug; items: string[]}[]
	}): Promise<{id: string} | void>
}
