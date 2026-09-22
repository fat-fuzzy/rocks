import {SCHEMA_VERSION} from '../../../config/setup.js'
import {defineSchema} from '../../index.js'

const PathValueSchema = defineSchema({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'PathValue',
	type: 'object',
	properties: {
		description: {
			type: 'string',
			const: 'Validation schema for a Path',
		},
		schema_version: {
			$ref: '#/definitions/schemaVersion',
			const: SCHEMA_VERSION,
		},
		value: {
			$ref: '#/definitions/path',
		},
	},
	required: ['value'],
	additionalProperties: false,
})

export default PathValueSchema
