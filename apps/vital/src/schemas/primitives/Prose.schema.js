import {defineSchema} from '../index.js'

const ProseSchema = defineSchema({
	type: 'object',
	properties: {
		html: {type: 'string'},
		json: {type: 'object'},
	},
	required: ['html', 'json'],
	additionalProperties: false,
})

export default ProseSchema
