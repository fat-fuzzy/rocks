import {describe, test, expect} from 'vitest'

import {getSanitizedParamCsvValue} from '#lib/common/url.js'

describe('url.ts - URL params helper', () => {
	test('csv param sanitizer survives real compare-view section lists', () => {
		const searchParams = new URLSearchParams(
			'?source_sections=header,summary,bad!char,skills',
		)
		expect(getSanitizedParamCsvValue(searchParams, 'source_sections')).toBe(
			'header,summary,skills',
		)
	})
	test('csv param sanitizer rejects an all-invalid list back to null', () => {
		const searchParams = new URLSearchParams(
			'?source_sections=alert(0),#test=*fail*',
		)
		expect(
			getSanitizedParamCsvValue(searchParams, 'source_sections'),
		).toBeNull()
	})
})
