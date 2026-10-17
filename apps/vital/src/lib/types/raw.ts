import type {
	DocLanguage,
	Slug,
	DocMeta,
	Section,
	Preset,
	FrontmatterBase,
	FrontmatterStructure,
	Uuid,
	DocPath,
} from '#types'

export type RawSchema = {
	schema_version: number
} & Record<string, unknown>

export type RawDoc = {
	content: {schema_version: string; id: Uuid; path: DocPath}
	meta: {language: DocLanguage; format: Slug; name: Slug}
} & Record<string, unknown>

export type RawSection = {
	content: Section
	meta: DocMeta
}

export type RawPreset = {content: Preset; meta: DocMeta}

export type RawBase = {content: FrontmatterBase; meta: DocMeta}

export type RawStructureTree = {
	content: {structure: FrontmatterStructure[]}
	meta: DocMeta
}

export type RawStructure = {
	content: FrontmatterStructure
	meta: DocMeta
}
