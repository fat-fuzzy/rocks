import type {TestForm} from '$types'
import {describe, it, expect, beforeEach} from 'vitest'

import {TestFormValidator} from '$lib/utils/validate'
import FormValidator from '$lib/utils/browser/FormValidator.svelte'
import {INPUTS} from '$tests/fixtures/form-inputs'

describe('FormValidator - sanitize inputs before validation', () => {
	let validator: FormValidator<TestForm>

	beforeEach(() => {
		validator = new FormValidator(TestFormValidator)
	})

	describe('init', () => {
		it('should sanitize values when setting', async () => {
			const formData = new FormData()

			if (INPUTS.email.value.unsanitized) {
				formData.append('email', INPUTS.email.value.unsanitized)
			}

			await validator.init(formData, {email: 'email'})

			const sanitizedValue = validator.form.email.value

			if (INPUTS.email.value.sanitized) {
				expect(sanitizedValue).toEqual(INPUTS.email.value.sanitized)
			}
		})
	})

	describe('setFieldValue', () => {
		it('should sanitize values when setting', async () => {
			const formData = new FormData()

			if (INPUTS.email.value.unsanitized) {
				formData.append('email', INPUTS.email.value.unsanitized)
				validator.setFieldValue('email', INPUTS.email.value.unsanitized)
			}

			const sanitizedValue = validator.form.email.value

			if (INPUTS.email.value.sanitized) {
				expect(sanitizedValue).toEqual(INPUTS.email.value.sanitized)
			}
		})
	})
})
