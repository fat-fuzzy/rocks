import {describe, it, expect, beforeEach, vi} from 'vitest'
import validations from '@fat-fuzzy/validation'

import FormValidator from '$lib/utils/dom/FormValidator.svelte'
import {
	INPUTS,
	getInputFields,
	initFormDataWithInputs,
} from '$tests/fixtures/form'

const {sanitize, validate} = validations

// Mock the validations module
vi.mock('@fat-fuzzy/validation', () => ({
	default: {
		sanitize: {
			sanitizeForm: vi.fn((type, value) => value),
		},
		validate: {
			MockValidationFunction: vi.fn(),
		},
	},
}))

describe('FormValidator - a class that validates form inputs using validation functions from @fat-fuzzy/validation', () => {
	let validator: FormValidator
	// @ts-expect-error need to add types for ajvValidate
	const mockValidate = validate['MockValidationFunction']
	const mockSanitize = sanitize.sanitizeForm

	beforeEach(() => {
		vi.clearAllMocks()
		validator = new FormValidator('MockValidationFunction')
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
			const fields = getInputFields()

			await validator.init(formData, fields)

			expect(validator.inputTypes).toEqual(fields)
			expect(validator.form.sample_email).toEqual({
				feedback: {},
				touched: false,
				changed: false,
			})
			expect(validator.form.sample_name).toEqual({
				feedback: {},
				touched: false,
				changed: false,
			})
		})

		it('should initialize field values from FormData', async () => {
			await initFormDataWithInputs(validator, 'valid')

			Object.keys(INPUTS).forEach((key) => {
				const input = INPUTS[key]
				if (input.value.valid) {
					expect(validator.form[key].value).toBe(input.value.valid)
				}
			})
		})

		it('should sanitize values when setting', async () => {
			await initFormDataWithInputs(validator, 'unsanitized')

			expect(mockSanitize).toHaveBeenCalledWith(
				'email',
				INPUTS.sample_email.value.unsanitized,
			)
		})

		it('should handle empty FormData', async () => {
			const formData = new FormData()
			const fields = {sample_email: 'email'}

			await validator.init(formData, fields)

			expect(validator.form.sample_email.value).toBeUndefined()
		})
	})

	describe('preValidate', () => {
		beforeEach(async () => {
			const formData = new FormData()
			await validator.init(formData, {email: 'email', name: 'text'})
		})

		it('should only include changed fields in schema', () => {
			validator.form.email.changed = true
			validator.form.email.value = INPUTS.sample_email.value.valid
			validator.form.name.changed = false
			validator.form.name.value = INPUTS.sample_name.value.valid

			const schema = validator.preValidate(['email', 'name'])

			expect(schema).toEqual({email: INPUTS.sample_email.value.valid})
			expect(schema.name).toBeUndefined()
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
				sample_email: 'email',
				sample_name: 'text',
			})
		})

		it('should mark fields as invalid when errors exist', () => {
			validator.errors = [
				{instancePath: '/sample_email', message: 'Must be a valid email'},
			]

			validator.postValidate(['sample_email'])

			expect(validator.form.sample_email.is_valid).toBe(false)
			expect(validator.form.sample_email.feedback['error']).toEqual([
				'Must be a valid email',
			])
		})

		it('should mark fields as valid when no errors exist', () => {
			validator.errors = []
			validator.form.sample_email.is_valid = false

			validator.postValidate(['sample_email'])

			expect(validator.form.sample_email.is_valid).toBe(true)
			expect(validator.form.sample_email.feedback['error']).toBeUndefined()
		})

		it('should handle multiple errors for the same field', () => {
			validator.errors = [
				{instancePath: '/sample_email', message: 'Must be a valid email'},
				{instancePath: '/sample_email', message: 'Email is required'},
			]

			validator.postValidate(['sample_email'])

			expect(validator.form.sample_email.feedback['error']).toEqual([
				'Must be a valid email',
				'Email is required',
			])
		})
	})

	describe('validate', () => {
		beforeEach(async () => {
			await initFormDataWithInputs(validator, 'invalid')

			Object.keys(INPUTS).forEach((key) => {
				validator.form[key].changed = true
			})
		})

		it('should call ajvValidate with the schema', () => {
			const mockErrors = [{instancePath: '/email', message: 'invalid format'}]
			mockValidate.mockReturnValue(false)
			mockValidate.errors = mockErrors

			validator.validate()

			expect(mockValidate).toHaveBeenCalledWith({
				confirm_password: 'ThisIsNotSecure',
				sample_checkbox: undefined,
				sample_checkbox_group: undefined,
				// sample_description: undefined,
				sample_disabled_field: undefined,
				sample_email: 'bird@fat-fuzzy',
				sample_name: 'F',
				sample_password: 'pwd',
				sample_phone: '123-456-7890',
				sample_postcode: 'ABC',
				sample_radio_group: undefined,
				sample_select: undefined,
			})
		})

		it('should set errors when validation fails', () => {
			const mockErrors = [{instancePath: '/email', message: 'invalid format'}]
			mockValidate.mockReturnValue(false)
			mockValidate.errors = mockErrors

			validator.validate()

			expect(validator.errors).toEqual(mockErrors)
		})

		it('should not set errors when validation passes', () => {
			mockValidate.mockReturnValue(true)

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
			mockValidate.mockReturnValue(true)
		})

		it('should mark field as changed and validate', () => {
			const mockInput = document.createElement('input')
			mockInput.name = 'email'
			mockInput.value = 'new@example.com'
			const event = new Event('change')
			Object.defineProperty(event, 'target', {value: mockInput})

			validator.changeInput(event)

			expect(validator.form.email.changed).toBe(true)
			expect(validator.form.email.value).toBe('new@example.com')
			expect(mockValidate).toHaveBeenCalled()
		})
	})

	describe('destroy', () => {
		it('should reset all properties', async () => {
			const formData = new FormData()
			formData.append('email', INPUTS.sample_email.value.valid)
			await validator.init(formData, {email: 'email'})
			validator.errors = [{instancePath: '/email', message: 'error'}]

			await validator.destroy()

			expect(validator.form).toEqual({})
			expect(validator.inputTypes).toEqual({})
			expect(validator.errors).toEqual([])
			expect(validator.ajvValidate()).toEqual({})
		})
	})

	describe('validationHandler proxy', () => {
		it('should sanitize values when setting', async () => {
			const formData = new FormData()

			if (INPUTS.sample_email.value.unsanitized) {
				formData.append('sample_email', INPUTS.sample_email.value.unsanitized)
			}

			await validator.init(formData, {sample_email: 'email'})

			expect(mockSanitize).toHaveBeenCalledWith(
				'email',
				INPUTS.sample_email.value.unsanitized,
			)
		})

		it('should get field values correctly', async () => {
			const formData = new FormData()
			formData.append('sample_email', INPUTS.sample_email.value.valid)
			await validator.init(formData, {sample_email: 'email'})

			expect(validator.form.sample_email.value).toBe(
				INPUTS.sample_email.value.valid,
			)
		})
	})
})
