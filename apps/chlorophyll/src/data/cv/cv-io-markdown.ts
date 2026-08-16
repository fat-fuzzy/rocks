import type {
	ModuleImportInterface,
	SeedSection,
	SeedDocParsingOptions,
	SeedRootParsingOptions,
	SeedDoc,
	FrontmatterSeed,
	FrontmatterBase,
	FrontmatterStructure,
} from '$types'

import assetsUtils from '$data/markdown-in'
import sort from '$lib/common/sort'

import {
	PATHS_CV_L10N_FORMATS,
	PATH_PREFIX_STRUCTURE,
	PATHS_STRUCTURE,
	CV_HEADER,
	CV_SECTIONS,
	NESTED_SECTIONS,
} from './cv-config'

async function parseMarkdownCvSeed(): Promise<FrontmatterBase | void> {
	const base = PATHS_STRUCTURE['base']

	const baseMarkdown = await assetsUtils.parseBaseMarkdowns(
		PATH_PREFIX_STRUCTURE,
		base as Record<string, () => Promise<ModuleImportInterface>>,
	)

	return baseMarkdown[0]
}

async function parseMarkdownCvMeta({
	formats,
}: SeedRootParsingOptions): Promise<FrontmatterSeed> {
	const base = PATHS_STRUCTURE['base']
	const structures: FrontmatterStructure[] = []

	const baseMarkdown = await assetsUtils.parseBaseMarkdowns(
		PATH_PREFIX_STRUCTURE,
		base as Record<string, () => Promise<ModuleImportInterface>>,
	)

	for (const format of formats) {
		const structure = PATHS_STRUCTURE[format]
		const structureMarkdown = await assetsUtils.parseStructureMarkdowns(
			PATH_PREFIX_STRUCTURE,
			structure as Record<string, () => Promise<ModuleImportInterface>>,
		)
		structures.push(structureMarkdown[0])
	}
	const markdownCvData: FrontmatterSeed = {
		base: baseMarkdown[0],
		structures,
	}

	return markdownCvData
}

async function parseHeaderMarkdowns({
	startIndex,
	language,
	header,
}: SeedDocParsingOptions): Promise<SeedSection[]> {
	if (!header) {
		return []
	}

	const localizations = PATHS_CV_L10N_FORMATS[language]

	if (!localizations) {
		return []
	}

	const pathPrefix = `${localizations.pathPrefix}`
	const experience = PATHS_CV_L10N_FORMATS[language][header] as Record<
		string,
		() => Promise<ModuleImportInterface>
	>

	const markdowns = await assetsUtils.parseContentMarkdowns(
		startIndex ?? 1,
		header,
		pathPrefix,
		experience,
	)

	return markdowns.sort(sort.sortByNameDesc)
}

async function parseSectionMarkdowns({
	startIndex,
	language,
	format,
	section,
}: SeedDocParsingOptions): Promise<SeedSection[]> {
	if (!section || !format) {
		return []
	}

	const localizations = PATHS_CV_L10N_FORMATS[language]

	if (!localizations) {
		return []
	}

	const isNested = NESTED_SECTIONS.includes(section)

	const pathPrefix = isNested
		? `${localizations.pathPrefix}${format}/${section}/`
		: `${localizations.pathPrefix}${format}/`

	if (typeof PATHS_CV_L10N_FORMATS[language][section] === 'string') {
		throw Error('Seed doc structure cannot be parsed')
	}

	const sectionImports = PATHS_CV_L10N_FORMATS[language][section][
		format
	] as Record<string, () => Promise<ModuleImportInterface>>

	const markdowns = await assetsUtils.parseContentMarkdowns(
		startIndex ?? 1,
		section,
		pathPrefix,
		sectionImports,
		isNested,
	)

	return markdowns.sort(sort.sortByNameDesc)
}

async function parseMarkdownCvContent({
	language,
	format,
}: SeedDocParsingOptions): Promise<SeedDoc | void> {
	const markdownCvData: SeedDoc = {
		language,
		format,
		sections: [],
	}

	let sectionIndex = 1
	for (const header of CV_HEADER) {
		const data = await parseHeaderMarkdowns({
			startIndex: sectionIndex++,
			language,
			format,
			header,
		})
		if (data) {
			markdownCvData.sections.push(data)
		}
	}

	if (!format) return

	for (const section of CV_SECTIONS) {
		const data = await parseSectionMarkdowns({
			startIndex: sectionIndex++,
			language,
			format,
			section,
		})
		if (data) {
			markdownCvData.sections.push(data)
		}
	}

	return markdownCvData
}

export default {
	parseMarkdownCvSeed,
	parseMarkdownCvMeta,
	parseMarkdownCvContent,
}
