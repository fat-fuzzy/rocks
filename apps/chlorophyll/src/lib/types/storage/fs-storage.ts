import type {
	DocMeta,
	DocPath,
	DocContentType,
	Prose,
	Section,
	Preset,
	FrontmatterBase,
	FrontmatterStructure,
} from '$types'

export type StorageCreateOrUpdatePayload = {
	type: DocContentType
	meta: DocMeta
	path: DocPath
	content: Prose
}
// Storage Output

export type OPFSTreeDoc = Record<string, {content: Section; meta: DocMeta}>
export type OPFSTreePreset = Record<string, {content: Preset; meta: DocMeta}>
export type OPFSTreeBase = {
	content: FrontmatterBase
	meta: {name: string}
}
export type OPFSTreeStructure = {
	content: {structure: FrontmatterStructure[]}
	meta: {name: string}
}
