import {describe, test, expect} from 'vitest'

import * as validators from '$lib/generated/ajv/validation/validate.ajv.mjs'

describe('Base values schema definitions', () => {
	test('Detect unanchored injection attempts', () => {
		expect(
			validators.LanguageValueValidationFunction('en_javascript:alert(1)EN'),
		).toBe(false)

		expect(
			validators.PathValueValidationFunction('javascript:malicious-script'),
		).toBe(false)

		expect(validators.SlugValueValidationFunction('file:not-a-slug')).toBe(
			false,
		)

		expect(
			validators.DateStringValueValidationFunction('malformed-2024-01-01-{}'),
		).toBe(false)
	})
})
