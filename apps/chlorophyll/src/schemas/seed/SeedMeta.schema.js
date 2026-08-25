import {defineSchema} from '../index.js'

const SeedMetaSchema = defineSchema({
	type: 'object',
	properties: {
		id: {
			$ref: '#/definitions/slug',
		},
		rank: {
			$ref: '#/definitions/rank',
		},
		name: {
			$ref: '#/definitions/slug',
		},
		group: {
			$ref: '#/definitions/slug',
		},
		label: {
			$ref: '#/definitions/text',
		},
		title: {
			$ref: '#/definitions/text',
		},
		subtitle: {
			$ref: '#/definitions/text',
		},
		language: {
			$ref: '#/definitions/docLanguage',
		},
		content_type: {
			$ref: '#/definitions/docContentType',
		},
		blocks: {
			type: 'array',
			items: {
				$ref: '#/definitions/SeedBlock',
			},
		},
	},
	required: ['name', 'language', 'content_type'],
	additionalProperties: false,
})

export default SeedMetaSchema
