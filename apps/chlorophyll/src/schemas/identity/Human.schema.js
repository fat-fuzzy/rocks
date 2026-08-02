import BaseSchema from '../primitives/Base.schema.js'
import RoleSchema from './Role.schema.js'
import GroupSchema from './Group.schema.js'

/** @type {import('json-schema-to-typescript').JSONSchema} */
const HumanSchema = {
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'Human',
	type: 'object',
	properties: {
		schema_version: {
			$ref: '#/definitions/schemaVersion',
			const: '0.1',
		},
		id: {
			$ref: '#/definitions/uuid',
		},
		username: {
			$ref: '#/definitions/username',
		},
		role: {
			$ref: '#/definitions/Role',
		},
		date_added: {
			$ref: '#/definitions/date',
		},
	},
	required: ['id', 'username', 'role', 'date_added'],
	additionalProperties: false,
	definitions: {
		...BaseSchema,
		Role: RoleSchema,
		Group: GroupSchema,
	},
}

export default HumanSchema
