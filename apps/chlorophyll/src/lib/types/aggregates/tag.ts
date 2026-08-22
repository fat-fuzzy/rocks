import type {Block, Slug, TagGroup} from '$types'

export interface TagIndex {
	tags: Record<string, string[]> // keyed by group
	taggedBlocks: Record<string, Block[]> //   keyed by tagKey = group:tag
}

export interface IAggregateTags {
	readonly loading: boolean
	readonly error: boolean
	readonly tagGroups: TagGroup[]
	readonly tagIndex: TagIndex

	init(): Promise<void>
	reset(): void

	createTag(options: {
		name: Slug
		group: {name: Slug; title: string; type?: string}
	}): Promise<{id: string} | void>

	deleteTags(options: {
		groups: {name: Slug; items: string[]}[]
	}): Promise<{id: string} | void>
}
