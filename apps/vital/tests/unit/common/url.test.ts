import {describe, test, expect} from 'vitest'

import {getSanitizedParamCsvValue} from '$lib/common/url'

describe('url.ts - URL params helper', () => {
	test('csv param sanitizer survives real compare-view section lists', () => {
		const url = new URL(
			'http://example.com/?source_sections=header,summary,bad!char,skills',
		)
		expect(getSanitizedParamCsvValue(url, 'source_sections')).toBe(
			'header,summary,skills',
		)
	})
	test('csv param sanitizer rejects an all-invalid list back to null', () => {
		const url = new URL(
			'http://example.com/?source_sections=alert(0),#test=*fail*',
		)
		expect(getSanitizedParamCsvValue(url, 'source_sections')).toBeNull()
	})
})
