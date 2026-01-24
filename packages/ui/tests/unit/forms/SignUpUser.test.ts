import {describe, it, expect} from 'vitest'
import SignUpUser from '$lib/forms/SignUpUser'
import {SIGNUP_INPUTS} from '$tests/fixtures/form'

const signUpFields = [
	'sample_username',
	'sample_email',
	'sample_password',
	'confirm_password',
]

describe(`SignUpUser - a class that reads user FormData and validates it using on JSON Schema`, () => {
	const userContext = new SignUpUser()
	describe('constructor', () => {
		it('should initialize with no arguments', () => {
			expect(userContext.toString()).toEqual('')
		})
	})

	describe('signup', () => {
		it('should detect unsanitized data', () => {
			const formData = new FormData()

			signUpFields.forEach((field) => {
				let value
				if (SIGNUP_INPUTS[field].value.unsanitized) {
					value = SIGNUP_INPUTS[field].value.unsanitized
				} else {
					value = SIGNUP_INPUTS[field].value.valid
				}
				formData.append(field, value)
			})

			try {
				userContext.signup(formData)
			} catch (e: unknown) {
				expect((e as Error).message).toEqual('Validation failed')
			}
		})

		it('should detect invalid data', () => {
			const formData = new FormData()

			signUpFields.forEach((field) => {
				let value
				if (SIGNUP_INPUTS[field].value.invalid) {
					value = SIGNUP_INPUTS[field].value.invalid
				} else {
					value = SIGNUP_INPUTS[field].value.valid
				}
				formData.append(field, value)
			})

			try {
				userContext.signup(formData)
			} catch (e: unknown) {
				expect((e as Error).message).toEqual('Validation failed')
			}
		})

		it('should return true if all is valid', () => {
			const formData = new FormData()

			signUpFields.forEach((field) => {
				const value = SIGNUP_INPUTS[field].value.valid
				formData.append(field, value)
			})

			const result = userContext.signup(formData)
			expect(result).toEqual(true)
		})

		it('should detect invalid data provided after valid data', () => {
			const formData = new FormData()

			signUpFields.forEach((field) => {
				const value = SIGNUP_INPUTS[field].value.valid
				formData.append(field, value)
			})

			const result = userContext.signup(formData)
			expect(result).toEqual(true)

			signUpFields.forEach((field) => {
				let value
				if (SIGNUP_INPUTS[field].value.invalid) {
					value = SIGNUP_INPUTS[field].value.invalid
				} else {
					value = SIGNUP_INPUTS[field].value.valid
				}
				formData.append(field, value)
			})

			try {
				userContext.signup(formData)
			} catch (e: unknown) {
				expect((e as Error).message).toEqual('Validation failed')
			}
		})
	})
})
