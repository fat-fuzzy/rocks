import {defineSchema} from '../index.js'

import FormBaseSchema from '../primitives/FormBase.schema.js'

const FormBlockSchema = defineSchema({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'FormBlock',
	type: 'object',
	properties: {
		description: {
			type: 'string',
			const: 'Validation schema for Block create/update form',
		},
		schema_version: {
			$ref: '#/definitions/schemaVersion',
			const: '0.1',
		},
		parent: {
			$ref: '#/definitions/slug',
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
		group: {
			type: 'string',
			maxLength: 64,
		},
		subsections: {
			type: 'string',
			maxLength: 64,
		},
		tags: {
			type: 'array',
			items: {
				$ref: '#/definitions/slug',
			},
		},
	},
	required: ['parent', 'name', 'rank'],
	// additionalProperties: false, FIXME: tag groups generate additional properties per group (guard: Block will be checked on save)
	definitions: FormBaseSchema,
})

export default FormBlockSchema
