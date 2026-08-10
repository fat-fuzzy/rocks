import type {Block} from '$types'

export interface TagIndex {
	tags: Record<string, string[]> // keyed by group
	taggedBlocks: Record<string, Block[]> //   keyed by tagKey = group:tag
}
