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

export type OPFSDocumentTree = Record<string, {content: Section; meta: DocMeta}>
export type OPFSPresetTree = Record<string, {content: Preset; meta: DocMeta}>
export type OPFSBaseTree = {
	content: FrontmatterBase
	meta: {name: string}
}
export type OPFSStructureTree = {
	content: {structure: FrontmatterStructure[]}
	meta: {name: string}
}
