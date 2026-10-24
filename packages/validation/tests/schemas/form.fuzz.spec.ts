import {expect, test} from 'vitest'
import fc from 'fast-check'
import * as validations from '../../src/ajv/out/validate.ajv.mjs'

fc.configureGlobal({numRuns: 100_000})

test(`should validate Form string inputs`, () => {
	const validate = (username, email, password, confirm_password, match) => {
		const ajvValidate = validations.FormValidationFunction
		const validateMap = {
			username: username,
			email: email,
			password: password,
			confirm_password: match ? password : confirm_password,
		}
		ajvValidate(validateMap)
		const errors = ajvValidate.errors
		// Check that the result is either valid or invalid without throwing errors
		if (match) {
			expect(errors.length).toBeGreaterThanOrEqual(2)
		} else {
			expect(errors.length).toBeGreaterThanOrEqual(3)
		}
	}
	fc.assert(
		fc.property(
			fc.string(),
			fc.string(),
			fc.string(),
			fc.string(),
			fc.boolean(),
			validate,
		),
	)
})
