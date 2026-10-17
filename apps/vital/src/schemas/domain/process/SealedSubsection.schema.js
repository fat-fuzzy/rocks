import {defineSchema} from '../../index.js'
import SealedBlockSchema from './SealedBlock.schema.js'

const SealedSubsectionSchema = defineSchema({
	type: 'object',
	properties: {
		name: {
			$ref: '#/definitions/slug',
		},
		blocks: {
			type: 'array',
			items: SealedBlockSchema,
		},
	},
	required: ['name', 'blocks'],
	additionalProperties: false,
})

export default SealedSubsectionSchema
