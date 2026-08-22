import type {
	DocMeta,
	Doc,
	Preset,
	FrontmatterBase,
	FrontmatterStructure,
	DocLanguage,
	Slug,
} from '$types'
// Storage Output

export type OPFSTreeDoc = Record<
	string,
	Record<
		string,
		{
			content: Doc
			meta: {language: DocLanguage; format: Slug; name: DocLanguage}
		}
	>
>
export type OPFSTreePreset = Record<string, {content: Preset; meta: DocMeta}>
export type OPFSTreeBase = {
	content: FrontmatterBase
	meta: {name: string}
}

export type OPFSTreeStructure = {
	content: {structure: FrontmatterStructure[]}
	meta: {name: string}
}

export type OPFStructure = {
	content: FrontmatterStructure
	meta: {name: string}
}
