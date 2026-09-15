import {defineSchema} from '../index.js'

const SubsectionSchema = defineSchema({
	type: 'object',
	properties: {
		name: {
			$ref: '#/definitions/slug',
		},
		parent: {
			$ref: '#/definitions/slug',
		},
		rank: {
			$ref: '#/definitions/rank',
		},
		blocks: {
			type: 'array',
			items: {
				$ref: '#/definitions/Block',
			},
		},
	},
	required: ['name', 'rank', 'parent', 'blocks'],
	additionalProperties: false,
})

export default SubsectionSchema
