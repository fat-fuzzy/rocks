import {describe, expect, test} from 'vitest'

import {
	MAX_PARAMS,
	buildForwardedQuery,
	getAllowedParams,
	getAllowedParamsForRoute,
	getSanitizedParamCsvValue,
	getSanitizedParamValue,
	getSanitizedParamValueList,
} from '#lib/common/url.js'

describe('url.ts - URL params helper', () => {
	test('getSanitizedParamValue sanitizes atomic values and preserves valid language values', () => {
		const searchParams = new URLSearchParams(
			'?language=en&format=long&preset=study-notes&sections=overview',
		)

		expect(getSanitizedParamValue(searchParams, 'language')).toBe('en')
		expect(getSanitizedParamValue(searchParams, 'format')).toBe('long')
		expect(getSanitizedParamValue(searchParams, 'preset')).toBe('study-notes')
		expect(getSanitizedParamValue(searchParams, 'sections')).toBe('overview')
		expect(
			getSanitizedParamValue(new URLSearchParams('?preset=bad!char'), 'preset'),
		).toBeNull()
	})

	describe('getSanitizedParamCsvValue', () => {
		test('survives real compare-view section lists', () => {
			const searchParams = new URLSearchParams(
				'?source_sections=header,summary,bad!char,skills',
			)
			expect(getSanitizedParamCsvValue(searchParams, 'source_sections')).toBe(
				'header,summary,skills',
			)
		})

		test('rejects an all-invalid list back to null', () => {
			const searchParams = new URLSearchParams(
				'?source_sections=alert(0),#test=*fail*',
			)
			expect(
				getSanitizedParamCsvValue(searchParams, 'source_sections'),
			).toBeNull()
		})
	})

	test('getSanitizedParamValueList accumulates valid repeated values and ignores invalid ones', () => {
		const searchParams = new URLSearchParams(
			'?sections=overview&sections=bad!char&sections=summary&sections=bad?name',
		)

		expect(getSanitizedParamValueList(searchParams, 'sections')).toEqual([
			'overview',
			'summary',
		])
	})

	test('getAllowedParams collects only valid parameters for a namespace', () => {
		const searchParams = new URLSearchParams(
			'?language=en&format=long&preset=default&sections=summary&source_sections=header,skills,bad!char&target_tags=design,review&ignored=should-be-ignored',
		)

		expect(getAllowedParams('chlorophyll', searchParams)).toEqual({
			language: 'en',
			format: 'long',
			preset: 'default',
			sections: 'summary',
			source_sections: 'header,skills',
			target_tags: 'design,review',
		})
	})

	test('getAllowedParamsForRoute is scoped to the route path and ignores other route params', () => {
		const searchParams = new URLSearchParams(
			'?language=en&format=long&preset=live&sections=summary&source_sections=header,summary&target_sections=overview,skills',
		)

		expect(
			getAllowedParamsForRoute(
				'chlorophyll',
				'/chlorophyll/compare',
				searchParams,
			),
		).toEqual({
			language: 'en',
			format: 'long',
			preset: 'live',
			sections: 'summary',
			source_sections: 'header,summary',
			target_sections: 'overview,skills',
		})
	})

	describe('buildForwardedQuery', () => {
		test('sanitizes allowed params and preserves only valid slug values', () => {
			const searchParams = new URLSearchParams(
				'?language=en&format=long&source_sections=header&custom_value=hello-world&blocked=drop-me',
			)

			expect(buildForwardedQuery(searchParams, ['custom_value'])).toBe(
				'?language=en&format=long&source_sections=header&custom_value=hello-world',
			)
		})

		test('returns an empty string when no valid params remain after sanitization', () => {
			const searchParams = new URLSearchParams(
				'?blocked=bad!char&also_blocked=(not-valid)',
			)

			expect(buildForwardedQuery(searchParams, [])).toBe('')
		})

		test('stops after the max allowed parameter count', () => {
			const searchParams = new URLSearchParams()
			for (let i = 0; i < MAX_PARAMS + 3; i++) {
				searchParams.append(`param_${i}`, `value_${i}`)
			}

			const forwarded = buildForwardedQuery(searchParams, ['dynamic_param'])
			const params = new URLSearchParams(forwarded.replace(/^\?/, ''))

			expect(params.size).toBeLessThanOrEqual(MAX_PARAMS)
		})
	})
})
