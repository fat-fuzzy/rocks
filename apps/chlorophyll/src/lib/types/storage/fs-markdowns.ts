import type {Component} from 'svelte'

import type {
	Slug,
	DocLanguage,
	FrontmatterBase,
	FrontmatterStructure,
} from '$types'

export interface ModuleImportInterface {
	default: Component | string
	metadata: object
}

export type LanguageMarkdowns = {
	[section: string]:
		| string
		| Record<string, () => Promise<unknown>>
		| Record<string, Record<string, () => Promise<unknown>>>
}

export type MarkdownStructure = {
	[lang: string]: LanguageMarkdowns
}

export type FrontmatterSeed = {
	base: FrontmatterBase
	structures: FrontmatterStructure[]
}

export type SeedRootParsingOptions = {
	formats: Slug[]
}

export type SeedDocParsingOptions = {
	language: DocLanguage
	format: Slug
	header?: Slug
	section?: Slug
	startIndex?: number
}
