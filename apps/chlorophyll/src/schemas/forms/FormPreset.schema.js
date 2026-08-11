import {defineSchema} from '../index.js'

import FormBaseSchema from '../primitives/FormBase.schema.js'

const FormPresetSchema = defineSchema({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'FormPreset',
	type: 'object',
	properties: {
		description: {
			type: 'string',
			const: 'Validation schema for Preset create/update form',
		},
		schema_version: {
			$ref: '#/definitions/schemaVersion',
			const: '0.1',
		},
		name: {
			$ref: '#/definitions/slug',
		},
	},
	required: ['name'],
	additionalProperties: false,
	definitions: FormBaseSchema,
})

export default FormPresetSchema
