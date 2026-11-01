import {expect, test} from 'vitest'
import fc from 'fast-check'
import * as validations from '../../src/ajv/out/validate.ajv.mjs'

fc.configureGlobal({numRuns: 100_000})

test(`should validate Namespace string inputs`, () => {
	const validate = (namespace, route) => {
		const validateMap = {
			namespace,
			route,
		}
		const ajvValidate = validations.NamespaceValidationFunction
		ajvValidate(validateMap)

		const errors = ajvValidate.errors
		// Check that the result is invalid without throwing errors

		expect(errors.length).toBeGreaterThanOrEqual(1)
	}

	fc.assert(
		fc.property(
			fc.string(),
			fc.string({
				minLength: 2,
			}),
			validate,
		),
	)
})
