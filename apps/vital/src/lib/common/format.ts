import {sanitizeSlugValue, sanitizeLanguageValue} from '$lib/common/sanitize'

const buildBase = (language: string, format: string) => {
	const languageKey = sanitizeLanguageValue(language)
	const formatKey = sanitizeSlugValue(format)

	return `${languageKey}:${formatKey}`
}

export const getSectionKey = (
	language: string,
	format: string,
	name: string,
) => {
	const base = buildBase(language, format)

	const nameKey = sanitizeSlugValue(name)
	return `${base}:${nameKey}`
}

export const getSubsectionKey = (
	language: string,
	format: string,
	section: string,
	name: string,
) => {
	const base = buildBase(language, format)

	const sectionKey = sanitizeSlugValue(section)
	const nameKey = sanitizeSlugValue(name)

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

	const sectionKey = sanitizeSlugValue(section)
	const subsectionKey = subsection ? sanitizeSlugValue(subsection) : null
	const nameKey = sanitizeSlugValue(name)

	return subsectionKey
		? `${base}:${sectionKey}:${subsectionKey}:${nameKey}`
		: `${base}:${sectionKey}:${nameKey}`
}

export const getPresetKey = (name: string) => {
	const nameKey = sanitizeSlugValue(name)

	return nameKey
}

export const getTagKey = (group: string, name: string) => {
	const groupKey = sanitizeSlugValue(group)
	const nameKey = sanitizeSlugValue(name)

	return `${groupKey}:${nameKey}`
}
