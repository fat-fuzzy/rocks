import {SCHEMA_VERSION} from '../../config/setup.js'
import {defineSchema} from '../index.js'

import FormBaseSchema from '../primitives/FormBase.schema.js'

const FormTagSchema = defineSchema({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'FormTag',
	type: 'object',
	properties: {
		description: {
			type: 'string',
			const: 'Validation schema for Tag create/update form',
		},
		schema_version: {
			$ref: '#/definitions/schemaVersion',
			const: SCHEMA_VERSION,
		},
		name: {
			$ref: '#/definitions/slug',
		},
		group: {
			type: 'string',
			maxLength: 64,
		},
		groups: {
			type: 'string',
			maxLength: 64,
		},
		groupTitle: {
			$ref: '#/definitions/title',
		},
		type: {
			type: 'string',
			pattern: 'radio',
		},
	},
	required: ['name', 'group'],
	additionalProperties: false,
	definitions: FormBaseSchema,
})

export default FormTagSchema
