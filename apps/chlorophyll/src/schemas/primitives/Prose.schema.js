const ProseSchema = {
	type: 'object',
	properties: {
		html: {type: 'string'},
		json: {type: 'object'},
	},
	required: ['html', 'json'],
	additionalProperties: false,
}

export default ProseSchema
