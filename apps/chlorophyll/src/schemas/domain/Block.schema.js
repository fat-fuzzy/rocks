import {defineSchema} from '../index.js'

const BlockEntitySchema = defineSchema({
	type: 'object',
	properties: {
		content_type: {
			$ref: '#/definitions/docContentType', // generated at OPFS write
		},
		id: {
			$ref: '#/definitions/uuid',
		},
		name: {
			$ref: '#/definitions/slug',
		},
		group: {
			$ref: '#/definitions/slug',
		},
		rank: {
			$ref: '#/definitions/rank',
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
		parentId: {
			$ref: '#/definitions/uuid',
		},
	},
	required: [
		'id',
		'name',
		'rank',
		'content',
		'content_type',
		'parentId',
		'tags',
	],
	additionalProperties: false,
})

export default BlockEntitySchema
