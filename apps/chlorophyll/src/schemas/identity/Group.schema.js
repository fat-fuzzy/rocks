const GroupSchema = {
	type: 'object',
	properties: {
		id: {
			$ref: '#/definitions/uuid',
		},
		name: {
			$ref: '#/definitions/slug',
		},
		date_added: {
			$ref: '#/definitions/date',
		},
	},
	required: ['id', 'name', 'date_added'],
	additionalProperties: false,
}

export default GroupSchema
