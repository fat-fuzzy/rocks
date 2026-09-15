import {SCHEMA_VERSION} from '../../../config/setup.js'
import {defineSchema} from '../../index.js'

const LanguageValueSchema = defineSchema({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'LanguageValue',
	type: 'object',
	properties: {
		description: {
			type: 'string',
			const: 'Validation schema for a Language',
		},
		schema_version: {
			$ref: '#/definitions/schemaVersion',
			const: SCHEMA_VERSION,
		},
		value: {
			$ref: '#/definitions/docLanguage',
		},
	},
	required: ['value'],
	additionalProperties: false,
})

export default LanguageValueSchema
