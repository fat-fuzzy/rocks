import {expect, test} from 'vitest'
import fc from 'fast-check'
import * as validations from '../../src/ajv/out/validate.ajv.mjs'

fc.configureGlobal({numRuns: 100_000})

test(`should validate RouteParam string inputs`, () => {
	const validate = (name, type) => {
		const validateMap = {
			name,
			type,
		}
		const ajvValidate = validations.RouteParamValidationFunction
		ajvValidate(validateMap)

		const errors = ajvValidate.errors
		// Check that the result is invalid without throwing errors
		expect(errors.length).toBeGreaterThanOrEqual(1)
	}

	fc.assert(fc.property(fc.string(), fc.string(), validate))
})
