import {SCHEMA_VERSION} from '../../../config/setup.js'
import {defineSchema} from '../../index.js'
import FormBaseSchema from '../FormBase.schema.js'

const SlugValueSchema = defineSchema({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'SlugValue',
	type: 'object',
	properties: {
		description: {
			type: 'string',
			const: 'Validation schema for a Slug',
		},
		schema_version: {
			$ref: '#/definitions/schemaVersion',
			const: SCHEMA_VERSION,
		},
		value: {
			$ref: '#/definitions/slug',
		},
	},
	required: ['value'],
	additionalProperties: false,
	definitions: FormBaseSchema,
})

export default SlugValueSchema
