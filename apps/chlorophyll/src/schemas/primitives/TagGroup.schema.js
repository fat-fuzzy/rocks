const TagGroupSchema = {
	type: 'object',
	properties: {
		name: {$ref: '#/definitions/slug'},
		title: {$ref: '#/definitions/text'},
		type: {
			type: 'string',
			pattern: 'radio',
		},
		items: {
			type: 'array',
			items: {$ref: '#/definitions/slug'},
		},
	},
	required: ['name', 'title', 'items'],
	additionalProperties: false,
}

export default TagGroupSchema
