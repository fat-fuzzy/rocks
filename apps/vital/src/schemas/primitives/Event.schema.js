import {defineSchema} from '../index.js'

const EventSchema = defineSchema({
	type: 'object',
	properties: {
		type: {
			$ref: '#/definitions/eventType',
		}, // 'sent', 'response', 'interview', 'no-response'...
		date_event: {
			$ref: '#/definitions/dateString',
		},
		note: {
			$ref: '#/definitions/text',
		},
		seal_id: {
			$ref: '#/definitions/uuid',
		}, // optional link to a seal
	},
	required: ['type', 'date_event'],
	additionalProperties: false,
})

export default EventSchema
