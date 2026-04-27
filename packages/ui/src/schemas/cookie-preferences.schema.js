import {schemas} from '@fat-fuzzy/validation'

/**
 * Validation schema for Cookie Preferences.
 */
const schemaCookiePreferences = {
	$id: '#/definitions/CookiePreferencesSchema',
	$schema: 'http://json-schema.org/draft-07/schema#',
	type: 'object',
	properties: {
		functional: {$ref: '#/definitions/checkbox'},
		legitimateInterest: {$ref: '#/definitions/checkbox'},
	},
	definitions: schemas.schemaInputs,
}

export default schemaCookiePreferences
