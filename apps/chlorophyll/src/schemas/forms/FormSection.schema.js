import {SCHEMA_VERSION} from '../../config/setup.js'
import {defineSchema} from '../index.js'

import FormBaseSchema from '../primitives/FormBase.schema.js'

const FormSectionSchema = defineSchema({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'FormSection',
	type: 'object',
	properties: {
		description: {
			type: 'string',
			const: 'Validation schema for Section create/update form',
		},
		schema_version: {
			$ref: '#/definitions/schemaVersion',
			const: SCHEMA_VERSION,
		},
		name: {
			$ref: '#/definitions/slug',
		},
		rank: {
			$ref: '#/definitions/rank',
		},
		title: {
			$ref: '#/definitions/title',
		},
		formats: {
			$ref: '#/definitions/docFormat',
		},
	},
	required: ['name', 'rank'],
	additionalProperties: false,
	definitions: FormBaseSchema,
})

export default FormSectionSchema
