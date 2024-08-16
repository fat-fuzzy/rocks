import {expect, test} from 'vitest'
import fc from 'fast-check'
import * as validations from '../../src/ajv/out/validate.ajv.mjs'
import constants from '../utils/constants.js'

const {schemas} = constants

schemas.forEach((schema) => {
	test(`should validate ${schema.name} for string inputs`, () => {
		let ajvValidate = validations[schema.fn]

		fc.assert(
			fc.property(fc.boolean(), (match) => {
				const validateMap = schema.properties.reduce((propMap, property) => {
					propMap[property] = schema.valid[property]
					return propMap
				}, {})
				ajvValidate(validateMap)
				const errors = ajvValidate.errors
				expect(errors).toBe(null)
				// // Check that the result is either valid or invalid without throwing errors
				// if (match) {
				// 	expect(errors.length).toBe(0)
				// } else {
				// 	expect(errors.length).toBeGreaterThanOrEqual(3)
				// }
			}),
		)
	})
})
