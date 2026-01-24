import {describe, it, expect, beforeEach} from 'vitest'

import FormValidator from '$lib/utils/browser/FormValidator.svelte'
import {INPUTS} from '$tests/fixtures/form'

describe('FormValidator - sanitize inputs before validation', () => {
	let validator: FormValidator

	beforeEach(() => {
		validator = new FormValidator('TestFormValidationFunction')
	})

	describe('init', () => {
		it('should sanitize values when setting', async () => {
			const formData = new FormData()

			if (INPUTS.sample_email.value.unsanitized) {
				formData.append('sample_email', INPUTS.sample_email.value.unsanitized)
			}

			await validator.init(formData, {sample_email: 'email'})

			const sanitizedValue = validator.form.sample_email.value

			if (INPUTS.sample_email.value.sanitized) {
				expect(sanitizedValue).toEqual(INPUTS.sample_email.value.sanitized)
			}
		})
	})

	describe('setFieldValue', () => {
		it('should sanitize values when setting', async () => {
			const formData = new FormData()

			if (INPUTS.sample_email.value.unsanitized) {
				formData.append('sample_email', INPUTS.sample_email.value.unsanitized)
				validator.setFieldValue(
					'sample_email',
					INPUTS.sample_email.value.unsanitized,
				)
			}

			const sanitizedValue = validator.form.sample_email.value

			if (INPUTS.sample_email.value.sanitized) {
				expect(sanitizedValue).toEqual(INPUTS.sample_email.value.sanitized)
			}
		})
	})
})
