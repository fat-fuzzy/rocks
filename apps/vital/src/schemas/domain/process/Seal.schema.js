import {defineSchema} from '../../index.js'

import BaseSchema from '../../primitives/Base.schema.js'
import ProseSchema from '../../primitives/Prose.schema.js'

import SealedSectionSchema from './SealedSection.schema.js'

const SealSchema = defineSchema({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'Seal',
	type: 'object',
	properties: {
		description: {
			type: 'string',
			const: 'Reference to sealed content body',
		},
		schema_version: {
			$ref: '#/definitions/schemaVersion',
		},
		id: {
			$ref: '#/definitions/uuid',
		},
		name: {
			$ref: '#/definitions/slug',
		},
		date_sealed: {
			$ref: '#/definitions/dateString',
		},
		language: {
			$ref: '#/definitions/docLanguage',
		},
		format: {
			$ref: '#/definitions/slug',
		},
		sections: {
			type: 'array',
			items: SealedSectionSchema,
		},
	},
	required: [
		'schema_version',
		'id',
		'name',
		'date_sealed',
		'language',
		'format',
		'sections',
	],
	additionalProperties: false,
	definitions: {
		...BaseSchema,
		Prose: ProseSchema,
	},
})

export default SealSchema
