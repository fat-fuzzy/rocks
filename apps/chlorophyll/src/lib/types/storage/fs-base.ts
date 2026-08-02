import type {DocMeta, DocVisibility} from '$types'

export type PresetContent = {query: string}

export type FileMetadata = DocMeta & {
	visibility: DocVisibility
	date_created: string
	date_updated: string
}
