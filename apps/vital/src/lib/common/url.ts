import type {Slug, NamespaceKey, AllowedParamName, Route} from '$types'

import {NAMESPACES} from '$types'
import {sanitizeSlugValue, sanitizeLanguageValue} from '$lib/common/sanitize'

export const MAX_PARAMS = 100

export const RESERVED_PARAM_NAMES = getStaticAllowedParams(NAMESPACES)

function getStaticAllowedParams(
	namespaces: typeof NAMESPACES,
): Set<AllowedParamName> {
	const entries = Object.entries(namespaces)
	let params: AllowedParamName[] = []

	for (const namespace of entries) {
		const routes = namespace[1].children

		for (const route of routes) {
			params = params.concat(route.allowedParams.map((p) => p.name))
		}
	}
	return new Set(params)
}

export function getAllowedParams(
	namespace: NamespaceKey,
	searchParams: URLSearchParams,
): {[key in AllowedParamName]?: string} {
	const allowedParams = NAMESPACES[namespace].children
		.map((route: Route) => route.allowedParams || [])
		.flat()

	const params: {[key in AllowedParamName]?: string} = {}

	for (const {name, type} of allowedParams) {
		const value =
			type === 'csv'
				? getSanitizedParamCsvValue(searchParams, name)
				: getSanitizedParamValue(searchParams, name)
		if (value) {
			params[name] = value
		}
	}

	return params
}

export function getAllowedParamsForRoute(
	namespace: NamespaceKey,
	pathname: string,
	searchParams: URLSearchParams,
): {[key in AllowedParamName]?: string} {
	const allowedParams =
		NAMESPACES[namespace].children.find((route: Route) => route.id === pathname)
			?.allowedParams || []

	const params: {[key in AllowedParamName]?: string} = {}

	for (const {name, type} of allowedParams) {
		const value =
			type === 'csv'
				? getSanitizedParamCsvValue(searchParams, name)
				: getSanitizedParamValue(searchParams, name)
		if (value) {
			params[name] = value
		}
	}

	return params
}

export const getSanitizedParamValue = (
	searchParams: URLSearchParams,
	key: Slug,
): Slug | null => {
	const value = searchParams.get(key)

	return key === 'language'
		? sanitizeLanguageValue(value)
		: sanitizeSlugValue(value)
}

export const getSanitizedParamCsvValue = (
	searchParams: URLSearchParams,
	key: Slug,
): string | null => {
	const raw = searchParams.get(key)
	if (!raw) return null

	const clean = raw
		.split(',')
		.map((item) => sanitizeSlugValue(item))
		.filter((v): v is Slug => v !== null)

	return clean.length ? clean.join(',') : null
}

export const getSanitizedParamValueList = (
	searchParams: URLSearchParams,
	key: Slug,
): Slug[] => {
	const values = searchParams.getAll(key)
	return values.reduce((sanitized: Slug[], value: unknown) => {
		const clean = sanitizeSlugValue(value)
		if (clean) {
			sanitized.push(clean)
		}
		return sanitized
	}, [])
}

export const buildForwardedQuery = (
	searchParams: URLSearchParams,
	dynamicParams: string[],
): string => {
	const allowed = new Set([
		...Array.from(RESERVED_PARAM_NAMES),
		...dynamicParams,
	])
	const params = new URLSearchParams()

	for (const [key, value] of searchParams) {
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
