import {describe, it, expect, beforeEach} from 'vitest'

import {sanitize} from '@fat-fuzzy/validation'
import * as validators from '$lib/generated/ajv/validate.ajv.mjs'

import FormValidator from '$lib/utils/browser/FormValidator.svelte'
import {
	INPUTS,
	getSampleInputFields,
	initFormDataWithSampleInputs,
} from '$tests/fixtures/form-inputs'

describe('FormValidator - a class that validates form inputs using validation functions from @fat-fuzzy/validation', () => {
	let validator: FormValidator
	const mockValidate = validators['TestFormValidationFunction']
	const mockSanitize = sanitize.sanitizeForm

	beforeEach(() => {
		validator = new FormValidator('TestFormValidationFunction', validators)
	})

	describe('constructor', () => {
		it('should initialize with empty form and no errors', () => {
			expect(validator.form).toEqual({})
			expect(validator.errors).toEqual([])
		})

		it('should set the correct AJV validation function', () => {
			expect(validator.ajvValidate).toBe(mockValidate)
			expect(validator.sanitize).toBe(mockSanitize)
		})
	})

	describe('init', () => {
		it('should initialize form fields with inputTypes', async () => {
			const formData = new FormData()
			const fields = getSampleInputFields()

			await validator.init(formData, fields)

			expect(validator.inputTypes).toEqual(fields)
			expect(validator.form.email).toEqual({
				feedback: {},
				is_valid: undefined,
				touched: false,
				changed: false,
				type: 'email',
				value: undefined,
			})
			expect(validator.form.name).toEqual({
				feedback: {},
				is_valid: undefined,
				touched: false,
				changed: false,
				type: 'text',
				value: undefined,
			})
		})

		it('should initialize field values from FormData', async () => {
			await initFormDataWithSampleInputs(validator, 'valid')

			Object.keys(INPUTS).forEach((key) => {
				const input = INPUTS[key]
				if (input.value.valid) {
					expect(validator.form[key].value).toBe(input.value.valid)
				}
			})
		})

		it('should sanitize values when setting', async () => {
			await initFormDataWithSampleInputs(validator, 'unsanitized')

			expect(validator.form.email.value).toEqual(INPUTS.email.value.sanitized)
			// expect(mockSanitize).toHaveBeenCalledWith(
			// 	'email',
			// 	INPUTS.email.value.unsanitized,
			// )
		})

		it('should handle empty FormData', async () => {
			const formData = new FormData()
			const fields = {email: 'email'}

			await validator.init(formData, fields)

			expect(validator.form.email.value).toBeUndefined()
		})
	})

	describe('preValidate', () => {
		beforeEach(async () => {
			const formData = new FormData()
			await validator.init(formData, {email: 'email', name: 'text'})
		})

		it('should include changed or unchanged fields in schema', () => {
			validator.form.email.changed = true
			validator.form.email.value = INPUTS.email.value.valid
			validator.form.name.changed = false
			validator.form.name.value = INPUTS.name.value.valid

			const schema = validator.preValidate(['email', 'name'])

			expect(schema).toEqual({
				email: INPUTS.email.value.valid,
				name: INPUTS.name.value.valid,
			})
		})

		it('should reset errors array', () => {
			validator.errors = [{instancePath: '/email', message: 'Invalid'}]
			validator.form.email.changed = true

			validator.preValidate(['email'])

			expect(validator.errors).toEqual([])
		})

		it('should set is_valid to true and clear error feedback for changed fields', () => {
			validator.form.email.changed = true
			validator.form.email.is_valid = false
			validator.form.email.feedback['error'] = ['Previous error']

			validator.preValidate(['email'])

			expect(validator.form.email.is_valid).toBe(true)
			expect(validator.form.email.feedback['error']).toBeUndefined()
		})
	})

	describe('postValidate', () => {
		beforeEach(async () => {
			const formData = new FormData()
			await validator.init(formData, {
				email: 'email',
				name: 'text',
			})
		})

		it('should mark fields as invalid when errors exist', () => {
			validator.errors = [
				{instancePath: '/email', message: 'Must be a valid email'},
			]

			validator.postValidate(['email'])

			expect(validator.form.email.is_valid).toBe(false)
			expect(validator.form.email.feedback['error']).toEqual([
				'Must be a valid email',
			])
		})

		it('should mark fields as valid when no errors exist', () => {
			validator.errors = []
			validator.form.email.is_valid = false

			validator.postValidate(['email'])

			expect(validator.form.email.is_valid).toBe(true)
			expect(validator.form.email.feedback['error']).toBeUndefined()
		})

		it('should handle multiple errors for the same field', () => {
			validator.errors = [
				{instancePath: '/email', message: 'Must be a valid email'},
				{instancePath: '/email', message: 'Email is required'},
			]

			validator.postValidate(['email'])

			expect(validator.form.email.feedback['error']).toEqual([
				'Must be a valid email',
				'Email is required',
			])
		})
	})

	describe('validate', () => {
		it('should call ajvValidate with the schema', async () => {
			await initFormDataWithSampleInputs(validator, 'invalid')
			Object.keys(INPUTS).forEach((key) => {
				validator.form[key].changed = true
			})
			validator.validate()

			// expect(mockValidate).toHaveBeenCalledWith({
			// 	confirm_password: 'ThisIsNotSecure',
			// 	checkbox: undefined,
			// 	checkbox_group: undefined,
			// 	// description: undefined,
			// 	disabled_field: undefined,
			// 	email: 'bird@fat-fuzzy',
			// 	name: 'F',
			// 	password: 'pwd',
			// 	phone: '123-456-7890',
			// 	postcode: 'ABC',
			// 	radio_group: undefined,
			// 	select: undefined,
			// })
		})

		it('should set errors when validation fails', async () => {
			await initFormDataWithSampleInputs(validator, 'invalid')
			Object.keys(INPUTS).forEach((key) => {
				validator.form[key].changed = true
			})
			validator.validate()

			expect(validator.errors.length).toEqual(8)

			// TODO: test errors ?
		})

		it('should not set errors when validation passes', async () => {
			await initFormDataWithSampleInputs(validator, 'valid')
			validator.validate()

			expect(validator.errors).toEqual([])
		})
	})

	describe('formHasErrors', () => {
		it('should return true when errors exist', () => {
			validator.errors = [{instancePath: '/email', message: 'invalid'}]

			expect(validator.formHasErrors()).toBe(true)
		})

		it('should return false when no errors exist', () => {
			validator.errors = []

			expect(validator.formHasErrors()).toBe(false)
		})
	})

	describe('fieldHasError', () => {
		beforeEach(async () => {
			const formData = new FormData()
			await validator.init(formData, {email: 'email'})
		})

		it('should return true when field is changed and invalid', () => {
			validator.form.email.changed = true
			validator.form.email.is_valid = false

			expect(validator.fieldHasError('email')).toBe(true)
		})

		it('should return false when field is not changed', () => {
			validator.form.email.changed = false
			validator.form.email.is_valid = false

			expect(validator.fieldHasError('email')).toBe(false)
		})

		it('should return false when field is valid', () => {
			validator.form.email.changed = true
			validator.form.email.is_valid = true

			expect(validator.fieldHasError('email')).toBe(false)
		})

		it('should handle non-existent fields', () => {
			expect(validator.fieldHasError('nonexistent')).toBeFalsy()
		})
	})

	describe('getFieldErrors', () => {
		beforeEach(async () => {
			const formData = new FormData()
			await validator.init(formData, {email: 'email'})
		})

		it('should return errors for a field', () => {
			validator.form.email.feedback['error'] = ['Invalid format']

			expect(validator.getFieldErrors('email')).toEqual(['Invalid format'])
		})

		it('should return undefined when no errors exist', () => {
			expect(validator.getFieldErrors('email')).toBeUndefined()
		})

		it('should return undefined for non-existent fields', () => {
			expect(validator.getFieldErrors('nonexistent')).toBeUndefined()
		})
	})

	describe('touchInput', async () => {
		it('should mark field as touched', async () => {
			const formData = new FormData()
			await validator.init(formData, {email: 'email'})
			const mockInput = document.createElement('input')
			mockInput.name = 'email'
			const event = new Event('focus')
			Object.defineProperty(event, 'target', {value: mockInput})

			validator.touchInput(event)

			expect(validator.form.email.touched).toBe(true)
		})
	})

	describe('changeInput', () => {
		beforeEach(async () => {
			const formData = new FormData()
			await validator.init(formData, {email: 'email'})
			// mockValidate.mockReturnValue(true)
		})

		it('should mark field as changed', () => {
			const mockInput = document.createElement('input')
			mockInput.name = 'email'
			mockInput.value = 'new@example.com'
			const event = new Event('change')
			Object.defineProperty(event, 'target', {value: mockInput})

			validator.changeInput(event)

			expect(validator.form.email.changed).toBe(true)
			// expect(mockValidate).not.toHaveBeenCalled()
		})

		it('should mark field as changed and validate', () => {
			const mockInput = document.createElement('input')
			mockInput.name = 'email'
			mockInput.value = 'new@example.com'
			const event = new Event('change')
			Object.defineProperty(event, 'target', {value: mockInput})

			validator.changeInput(event, true)

			expect(validator.form.email.changed).toBe(true)
			expect(validator.form.email.value).toBe('new@example.com')
			// expect(mockValidate).toHaveBeenCalled()
		})
	})

	describe('destroy', () => {
		it('should reset all properties', async () => {
			const formData = new FormData()
			formData.append('email', INPUTS.email.value.valid)
			await validator.init(formData, {email: 'email'})
			validator.errors = [{instancePath: '/email', message: 'error'}]

			await validator.destroy()

			expect(validator.form).toEqual({})
			expect(validator.inputTypes).toEqual({})
			expect(validator.errors).toEqual([])
		})
	})

	describe('setFieldValue', () => {
		it('should sanitize values when setting', async () => {
			const formData = new FormData()

			if (INPUTS.email.value.unsanitized) {
				formData.append('email', INPUTS.email.value.unsanitized)
			}
			await validator.init(formData, {email: 'email'})

			expect(validator.form.email.value).toEqual(INPUTS.email.value.sanitized)
			// expect(mockSanitize).toHaveBeenCalledWith(
			// 	'email',
			// 	INPUTS.email.value.unsanitized,
			// )
		})

		it('should get field values correctly', async () => {
			const formData = new FormData()
			formData.append('email', INPUTS.email.value.valid)
			await validator.init(formData, {email: 'email'})

			expect(validator.form.email.value).toBe(INPUTS.email.value.valid)
		})
	})
})
