import {defineSchema} from '../index.js'

const FingerprintSchema = defineSchema({
	type: 'object',
	properties: {
		algorithm: {
			$ref: '#/definitions/hashAlgorithm',
		},
		value: {
			type: 'string',
		},
	},
	required: ['algorithm', 'value'],
	additionalProperties: false,
})

export default FingerprintSchema
