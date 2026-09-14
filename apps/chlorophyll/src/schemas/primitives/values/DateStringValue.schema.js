import {SCHEMA_VERSION} from '../../../config/setup.js'
import {defineSchema} from '../../index.js'
import FormBaseSchema from '../FormBase.schema.js'

const DateStringValueSchema = defineSchema({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'DateStringValue',
	type: 'object',
	properties: {
		description: {
			type: 'string',
			const: 'Validation schema for a Date string',
		},
		schema_version: {
			$ref: '#/definitions/schemaVersion',
			const: SCHEMA_VERSION,
		},
		value: {
			$ref: '#/definitions/dateString',
		},
	},
	required: ['value'],
	additionalProperties: false,
	definitions: FormBaseSchema,
})

export default DateStringValueSchema
