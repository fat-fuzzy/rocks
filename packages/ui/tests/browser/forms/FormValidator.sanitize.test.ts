import {describe, it, expect, beforeEach} from 'vitest'

import FormValidator from '$lib/utils/dom/FormValidator.svelte'
import {INPUTS} from '$tests/fixtures/form'

describe('FormValidator - sanitize inputs before validation', () => {
	let validator: FormValidator

	beforeEach(() => {
		validator = new FormValidator('MockValidationFunction')
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

	describe('validationHandler proxy', () => {
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
})
