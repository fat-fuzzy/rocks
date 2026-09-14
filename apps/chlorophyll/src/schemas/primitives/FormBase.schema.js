import {schemas} from '@fat-fuzzy/validation'
import {defineDefinitions} from '../index.js'
import {
	VERSION_PATTERN,
	SLUG_PATTERN,
	LANGUAGE_PATTERN,
	TITLE_PATTERN,
	PATH_PATTERN,
	DATE_STRING_PATTERN,
} from '../patterns.js'

import EnumsSchema from './Enums.schema.js'

/** @type {{[key: string]: import('json-schema-to-typescript').JSONSchema}} */
// @ts-expect-error these are JSON Schema definitions from @fat-fuzzy/validation package
const externalBase = schemas.BaseSchema

/**
 * FormBase types used for validating form inputs
 * -> allOf is necessary here validation to work correctly
 * CAVEAT: TypeScript types generated using `allOf` are problematic for data validation in transform operations
 * -> see ./Base.schema.js for equivalent types used in transforms
 */
const FormBaseSchema = defineDefinitions({
	...externalBase,
	...EnumsSchema,
	schemaVersion: {
		type: 'string',
		pattern: VERSION_PATTERN,
	},
	slug: {
		type: 'string',
		allOf: [{pattern: SLUG_PATTERN}, {minLength: 2}, {maxLength: 64}],
	},
	docLanguage: {
		oneOf: [
			{
				type: 'string',
				allOf: [{pattern: LANGUAGE_PATTERN}, {minLength: 2}, {maxLength: 2}],
			},
			{
				type: 'null',
			},
		],
	},
	title: {
		type: 'string',
		allOf: [{pattern: TITLE_PATTERN}, {minLength: 0}, {maxLength: 64}],
	},
	path: {
		type: 'string',
		allOf: [{pattern: PATH_PATTERN}, {minLength: 3}, {maxLength: 64}],
	},
	rank: {
		type: 'integer',
		minimum: 1,
		maximum: 500, // adjust as necessary
	},
	query: {
		type: 'string',
		// pattern: TODO
	},
	// TODO: update
	// date_exported: {
	// 	$ref: '#/definitions/date_time', // use ISO string, not Date object
	// },
	// TMP TODO: remove
	dateString: {
		type: 'string',
		oneOf: [
			{
				type: 'string',
				allOf: [
					{pattern: DATE_STRING_PATTERN},
					{minLength: 10},
					{maxLength: 10},
				],
			},
			{
				type: 'null',
			},
		],
	},
})

export default FormBaseSchema
