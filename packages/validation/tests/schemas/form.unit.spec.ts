import {expect, test} from 'vitest'
import fc from 'fast-check'
import * as validations from '../../src/ajv/out/validate.ajv.mjs'
import constants from '../utils/constants.js'

const {schemas} = constants

schemas.forEach((schema) => {
	test(`should validate ${schema.name} for string inputs`, () => {
		const ajvValidate = validations[schema.fn]

		fc.assert(
			fc.property(fc.boolean(), () => {
				const validateMap = schema.properties.reduce((propMap, property) => {
					propMap[property] = schema.valid[property]
					return propMap
				}, {})
				ajvValidate(validateMap)
				const errors = ajvValidate.errors
				expect(errors).toBe(null)
			}),
		)
	})
})
