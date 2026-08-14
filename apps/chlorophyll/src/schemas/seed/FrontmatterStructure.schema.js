import {SCHEMA_VERSION} from '../../config/setup.js'
import {defineSchema} from '../index.js'

import BaseSchema from '../primitives/Base.schema.js'
import DocPathSchema from '../primitives/DocPath.schema.js'

const FrontmatterStructureSchema = defineSchema({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'FrontmatterStructure',
	type: 'object',
	description:
		'Metadata that defines initial Doc seed structures for settings combinations',
	properties: {
		schema_version: {
			$ref: '#/definitions/schemaVersion',
			const: SCHEMA_VERSION,
		},
		seed_type: {
			$ref: '#/definitions/seedType',
		},
		name: {
			$ref: '#/definitions/slug',
		},
		path: {
			$ref: '#/definitions/DocPath',
		},
		format: {
			$ref: '#/definitions/docFormat',
		},
		sections: {
			type: 'array',
			items: {
				$ref: '#/definitions/slug',
			},
		},
		experience: {
			// FIXME: make generic : use subsections prop with group name
			type: 'array',
			items: {
				$ref: '#/definitions/slug',
			},
		},
	},
	required: ['schema_version', 'format', 'sections'],
	additionalProperties: false,
	definitions: {
		...BaseSchema,
		DocPath: DocPathSchema,
	},
})

export default FrontmatterStructureSchema
