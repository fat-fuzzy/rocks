import {defineSchema} from '../../index.js'
import SealedSubsectionSchema from './SealedSubsection.schema.js'
import FingerprintSchema from '../../primitives/Fingerprint.schema.js'

const SealedSectionSchema = defineSchema({
	type: 'object',
	properties: {
		name: {
			$ref: '#/definitions/slug',
		},
		title: {
			$ref: '#/definitions/text',
		},
		subtitle: {
			$ref: '#/definitions/text',
		},
		source_section_id: {
			$ref: '#/definitions/uuid',
		},
		content: {
			$ref: '#/definitions/Prose',
		},
		fingerprint: FingerprintSchema,
		subsections: {
			type: 'array',
			items: SealedSubsectionSchema,
		},
	},
	required: ['name', 'title', 'subsections'],
	additionalProperties: false,
})

export default SealedSectionSchema
