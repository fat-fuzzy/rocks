import {SCHEMA_VERSION} from '../../../config/setup.js'
import {defineSchema} from '../../index.js'

const UuidValueSchema = defineSchema({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'UuidValue',
	type: 'object',
	properties: {
		description: {
			type: 'string',
			const: 'Validation schema for a Uuid',
		},
		schema_version: {
			$ref: '#/definitions/schemaVersion',
			const: SCHEMA_VERSION,
		},
		value: {
			$ref: '#/definitions/uuid',
		},
	},
	required: ['value'],
	additionalProperties: false,
})

export default UuidValueSchema
