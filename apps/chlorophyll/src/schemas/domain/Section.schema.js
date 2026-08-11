import {defineSchema} from '../index.js'

const SectionSchema = defineSchema({
	type: 'object',
	properties: {
		content_type: {
			$ref: '#/definitions/docContentType', // generated at OPFS write
		},
		id: {
			$ref: '#/definitions/uuid', // generated at OPFS write
		},
		name: {
			$ref: '#/definitions/slug',
		},
		title: {
			$ref: '#/definitions/text',
		},
		subtitle: {
			$ref: '#/definitions/text',
		},
		rank: {
			$ref: '#/definitions/rank',
		},
		parentId: {
			$ref: '#/definitions/uuid',
		},
		content: {
			$ref: '#/definitions/Prose',
		},
		tags: {
			type: 'array',
			items: {
				$ref: '#/definitions/slug',
			},
		},
		subsections: {
			type: 'array',
			items: {
				$ref: '#/definitions/Subsection',
			},
		},
	},
	required: ['id', 'name', 'rank', 'parentId'],
	additionalProperties: false,
})

export default SectionSchema
