import {schemas} from '@fat-fuzzy/validation'
import {defineDefinitions} from '../index.js'

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
		pattern: '^[0-9]+\\.[0-9]+$', // semver-lite: "1.0", "2.3", etc.
	},
	slug: {
		type: 'string',
		pattern: '^[A-Za-z_]([A-Za-z0-9_-])*$',
		minLength: 2,
		maxLength: 64,
	},
	docLanguage: {
		type: 'string',
		pattern: '[a-z]{2}',
		minLength: 2,
		maxLength: 2,
	},
	title: {
		type: 'string',
		pattern: '^$|^[A-Za-z_](\\s?[A-Za-z0-9_-])*$',
		minLength: 0,
		maxLength: 64,
	},
	path: {
		type: 'string',
		pattern: '([A-Za-z_][A-Za-z0-9_-]*\\/?){1,3}$',
		minLength: 3,
		maxLength: 64,
	},
	rank: {
		type: 'integer',
		minimum: 1,
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
	date: {
		type: 'string',
		pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}',
	},
})

export default BaseSchema
