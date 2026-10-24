import {expect, test} from 'vitest'
import fc from 'fast-check'
import * as validations from '../../src/ajv/out/validate.ajv.mjs'
import {schemas} from '../fixtures/schemas.js'

test(`should validate Namespace for string inputs`, () => {
	const validate = () => {
		const validateMap = schemas.Namespace.valid
		const ajvValidate = validations.NamespaceValidationFunction
		ajvValidate(validateMap)

		const errors = ajvValidate.errors

		expect(errors).toBe(null)
	}
	fc.assert(fc.property(fc.boolean(), validate))
})
