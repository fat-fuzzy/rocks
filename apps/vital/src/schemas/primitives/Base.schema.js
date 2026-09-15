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
 * Base types used for validating data at transform boundaries:
 * aggregate <> bridge <> worker <> storage
 * CAVEAT: definitions that use multiple validation conditions need `allOf` to work for form validation
 * -> see ./FormBase.schema.js for equivalent types used in form validation
 */
const BaseSchema = defineDefinitions({
	...externalBase,
	...EnumsSchema,
	schemaVersion: {
		type: 'string',
		pattern: VERSION_PATTERN,
	},
	slug: {
		type: 'string',
		pattern: SLUG_PATTERN,
		minLength: 2,
		maxLength: 64,
	},
	docLanguage: {
		type: 'string',
		pattern: LANGUAGE_PATTERN,
		minLength: 2,
		maxLength: 2,
	},
	title: {
		type: 'string',
		pattern: TITLE_PATTERN,
		minLength: 0,
		maxLength: 64,
	},
	path: {
		type: 'string',
		pattern: PATH_PATTERN,
		minLength: 3,
		maxLength: 64,
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
	// TODO: fix this
	// CHECK AJV output error:

	// Generation failed: [@fat-fuzzy/validation] Unreplaced require() statement in compiled validator code.

	// date_exported: {
	// 	$ref: '#/definitions/date_time', // use ISO string, not Date object
	// },
	// TMP TODO: remove
	dateString: {
		type: 'string',
		pattern: DATE_STRING_PATTERN,
		minLength: 0,
		maxLength: 10,
	},
})

export default BaseSchema
