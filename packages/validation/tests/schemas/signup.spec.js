import {expect, test} from 'vitest'
import fc from 'fast-check'
import * as validations from '../../src/ajv/out/validate.ajv.mjs'

fc.configureGlobal({numRuns: 100_000})

const schemas = [
	{
		name: 'SignUp Form',
		fn: 'SignUpValidationFunction',
		properties: [
			'sample_username',
			'sample_email',
			'sample_password',
			'confirm_password',
		],
	},
]

schemas.forEach((schema) => {
	test(`should validate ${schema.name}`, () => {
		let ajvValidate = validations[schema.fn]
		fc.assert(
			fc.property(
				fc.stringMatching(/\s(html|php|css|python|java(script)?)\s/),
				fc.stringMatching(/\s(html|php|css|python|java(script)?)\s/),
				fc.stringMatching(/\s(html|php|css|python|java(script)?)\s/),
				fc.stringMatching(/\s(html|php|css|python|java(script)?)\s/),
				fc.boolean(),
				(username, email, password, confirm_password, match) => {
					const validateMap = {
						sample_username: username,
						sample_email: email,
						sample_password: password,
						confirm_password: match ? password : confirm_password,
					}
					const result = ajvValidate(validateMap)
					// Check that the result is either valid or invalid without throwing errors
					expect(result).toBeDefined()
				},
			),
		)
	})
})
