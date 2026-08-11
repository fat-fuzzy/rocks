import {defineSchema} from '../index.js'

import BaseSchema from '../primitives/Base.schema.js'
import DocPathSchema from '../primitives/DocPath.schema.js'
import TagGroupSchema from '../primitives/TagGroup.schema.js'

const FrontmatterBaseSchema = defineSchema({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'FrontmatterBase',
	type: 'object',
	description:
		'Metadata that defines the base settings available for Documents that affect document structure and available UI controls',
	properties: {
		schema_version: {
			$ref: '#/definitions/schemaVersion',
			const: '0.1',
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
		languages: {
			type: 'array',
			items: {
				$ref: '#/definitions/docLanguage',
			},
		},
		formats: {
			type: 'array',
			items: {
				$ref: '#/definitions/docFormat',
			},
		},
		tags: {
			type: 'array',
			items: {
				$ref: '#/definitions/TagGroup',
			},
		},
		settings: {
			type: 'array',
			items: {
				$ref: '#/definitions/TagGroup',
			},
		},
	},
	required: ['schema_version', 'languages', 'formats', 'tags', 'settings'],
	additionalProperties: false,
	definitions: {
		...BaseSchema,
		DocPath: DocPathSchema,
		TagGroup: TagGroupSchema,
	},
})

export default FrontmatterBaseSchema
