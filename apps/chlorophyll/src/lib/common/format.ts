import {
	parseSlugValue,
	parseLanguageValue,
} from '$lib/common/transform/parse-or-throw'

const buildBase = (language: string, format: string) => {
	const languageKey = parseLanguageValue('language Key', language)
	const formatKey = parseSlugValue('format Key', format)

	return `${languageKey}:${formatKey}`
}

export const getSectionKey = (
	language: string,
	format: string,
	name: string,
) => {
	const base = buildBase(language, format)

	const nameKey = parseSlugValue('name Key', name)
	return `${base}:${nameKey}`
}

export const getSubsectionKey = (
	language: string,
	format: string,
	section: string,
	name: string,
) => {
	const base = buildBase(language, format)

	const sectionKey = parseSlugValue('section Key', section)
	const nameKey = parseSlugValue('name Key', name)

	return `${base}:${sectionKey}:${nameKey}`
}

export const getBlockKey = (
	language: string,
	format: string,
	section: string,
	name: string,
	subsection?: string,
) => {
	const base = buildBase(language, format)

	const sectionKey = parseSlugValue('section Key', section)
	const subsectionKey = subsection
		? parseSlugValue('subsection Key', subsection)
		: ''
	const nameKey = parseSlugValue('name Key', name)

	return subsectionKey
		? `${base}:${sectionKey}:${subsectionKey}:${nameKey}`
		: `${base}:${sectionKey}:${nameKey}`
}

export const getPresetKey = (name: string) => {
	const nameKey = parseSlugValue('name Key', name)

	return nameKey
}

export const getTagKey = (group: string, name: string) => {
	const groupKey = parseSlugValue('group Key', group)
	const nameKey = parseSlugValue('name Key', name)

	return `${groupKey}:${nameKey}`
}
