import {defineSchema} from '../../index.js'
import FingerprintSchema from '../../primitives/Fingerprint.schema.js'

const SealedBlockSchema = defineSchema({
	type: 'object',
	properties: {
		source_block_id: {
			$ref: '#/definitions/uuid',
		},
		name: {
			$ref: '#/definitions/slug',
		},
		content: {
			$ref: '#/definitions/Prose',
		},
		fingerprint: FingerprintSchema,
	},
	required: [
		'source_block_id',
		'revision_id',
		'name',
		'content',
		'fingerprint',
	],
	additionalProperties: false,
})

export default SealedBlockSchema
