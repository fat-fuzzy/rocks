import {expect, test} from 'vitest'
import fc from 'fast-check'
import * as validations from '../../src/ajv/out/validate.ajv.mjs'
import constants from '../utils/constants.js'

fc.configureGlobal({numRuns: 100_000})

const {schemas} = constants

schemas.forEach((schema) => {
	test(`should validate ${schema.name} for string inputs`, () => {
		let ajvValidate = validations[schema.fn]
		fc.assert(
			fc.property(
				fc.string(),
				fc.string(),
				fc.string(),
				fc.string(),
				fc.boolean(),
				(username, email, password, confirm_password, match) => {
					const validateMap = {
						sample_username: username,
						sample_email: email,
						sample_password: password,
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
				},
			),
		)
	})

	test(`should validate ${schema.name}`, () => {
		let ajvValidate = validations[schema.fn]
		fc.assert(
			fc.property(
				fc.string(),
				fc.string(),
				fc.string(),
				fc.string(),
				fc.boolean(),
				(username, email, password, confirm_password, match) => {
					const validateMap = {
						sample_username: username,
						sample_email: email,
						sample_password: password,
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
				},
			),
		)
	})
})
