import BaseSchema from '../primitives/Base.schema.js'

/** @type {import('json-schema-to-typescript').JSONSchema} */
const PresetSchema = /** @type {const} */ {
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'Preset',
	type: 'object',
	properties: {
		description: {
			type: 'string',
			const: 'Domain definitions of Preset data',
		},
		schema_version: {
			$ref: '#/definitions/schemaVersion',
			const: '0.1',
		},
		name: {
			$ref: '#/definitions/slug',
		},
		id: {
			$ref: '#/definitions/uuid',
		},
		query: {
			$ref: '#/definitions/query',
		},
		locked: {
			type: 'boolean',
		},
	},
	required: ['id', 'name', 'query'],
	additionalProperties: false,
	definitions: BaseSchema,
}

export default PresetSchema
