import type {DocLanguage, Slug} from '$types'

import {DOC_LANGUAGE, DOC_FORMAT} from '$config/setup'
import {sanitizeSlugValue, sanitizeLanguageValue} from '$lib/common/sanitize'

export const getSanitizedParamValue = (url: URL, key: Slug): Slug | null => {
	const value = url.searchParams.get(key)
	return sanitizeSlugValue(value)
}

export const getSanitizedParamValueList = (url: URL, key: Slug): Slug[] => {
	const values = url.searchParams.getAll(key)
	return values.reduce((sanitized: Slug[], value: unknown) => {
		const clean = sanitizeSlugValue(value)
		if (clean) {
			sanitized.push(clean)
		}
		return sanitized
	}, [])
}

export const getSanitizedLanguage = (url: URL): DocLanguage => {
	const value = url.searchParams.get('language')
	let sanitized = sanitizeLanguageValue(value)

	if (!sanitized) {
		sanitized = DOC_LANGUAGE
	}

	return sanitized
}

export const getSanitizedFormat = (url: URL): Slug => {
	const value = url.searchParams.get('format')
	let sanitized = sanitizeSlugValue(value)

	if (!sanitized) {
		sanitized = DOC_FORMAT
	}

	return sanitized
}
