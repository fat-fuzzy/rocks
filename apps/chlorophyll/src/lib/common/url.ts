import type {Slug, RouteName} from '$types'

import {ROUTES} from '$types'
import {DOC_LANGUAGE, DOC_FORMAT} from '$config/setup'
import {sanitizeSlugValue, sanitizeLanguageValue} from '$lib/common/sanitize'

export const MAX_PARAMS = 100

export const RESERVED_PARAM_NAMES = getStaticAllowedParams(ROUTES)

function getStaticAllowedParams(routes: typeof ROUTES): Set<string> {
	const entries = Object.entries(routes)
	let params: string[] = []

	for (const entry of entries) {
		params = params.concat(entry[1].allowedParams)
	}
	return new Set(params)
}

export function getAllowedParamsForRoute(
	routeName: RouteName,
	url: URL,
): {[key: string]: string} {
	const allowedParams = ROUTES[routeName].allowedParams

	const params: {[key: string]: string} = {}

	for (const param of allowedParams) {
		const value = getSanitizedParamValue(url, param)
		if (value) {
			params[param] = value
		} else if (param === 'language') {
			params[param] = DOC_LANGUAGE
		} else if (param === 'format') {
			params[param] = DOC_FORMAT
		}
	}

	return params
}

export const getSanitizedParamValue = (url: URL, key: Slug): Slug | null => {
	const value = url.searchParams.get(key)

	return key === 'language'
		? sanitizeLanguageValue(value)
		: sanitizeSlugValue(value)
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

export const buildForwardedQuery = (
	url: URL,
	allowedParams_Static: string[],
	allowedParams_Dynamic: string[],
): string => {
	const allowed = new Set([...allowedParams_Static, ...allowedParams_Dynamic])
	const params = new URLSearchParams()

	for (const [key, value] of url.searchParams) {
		if (!allowed.has(key)) {
			continue
		}

		if (params.size > MAX_PARAMS) {
			break // FIXME: display UI message / deal with this better
		}

		const sanitizedValue = sanitizeSlugValue(value)
		const sanitizedKey = sanitizeSlugValue(key)

		if (sanitizedKey && sanitizedValue) {
			params.append(sanitizedKey, sanitizedValue)
		}
	}

	return params.toString() ? `?${params.toString()}` : ''
}
