import {SCHEMA_VERSION} from '../../config/setup.js'
import {defineSchema} from '../index.js'

import FormBaseSchema from '../primitives/FormBase.schema.js'

const FormLanguageSchema = defineSchema({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'FormLanguage',
	type: 'object',
	properties: {
		description: {
			type: 'string',
			const: 'Validation schema for Language create/update form',
		},
		schema_version: {
			$ref: '#/definitions/schemaVersion',
			const: SCHEMA_VERSION,
		},
		name: {
			$ref: '#/definitions/docLanguage',
		},
		sourceLanguage: {
			type: 'string',
		},
	},
	required: ['name'],
	additionalProperties: false,
	definitions: FormBaseSchema,
})

export default FormLanguageSchema
