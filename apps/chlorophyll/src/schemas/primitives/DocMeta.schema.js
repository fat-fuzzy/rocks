const DocMetaSchema = {
	type: 'object',
	properties: {
		label: {
			$ref: '#/definitions/text',
		},
		language: {
			$ref: '#/definitions/docLanguage',
		},
		id: {
			$ref: '#/definitions/uuid',
		},
		rank: {
			$ref: '#/definitions/rank',
		},
		group: {
			$ref: '#/definitions/slug',
		},
		name: {
			$ref: '#/definitions/slug',
		},
		title: {
			$ref: '#/definitions/text',
		},
		subtitle: {
			$ref: '#/definitions/text',
		},
		format: {
			$ref: '#/definitions/docFormat',
		},
		content_type: {
			$ref: '#/definitions/docContentType',
		},
		visibility: {
			$ref: '#/definitions/docVisibility',
		},
		tags: {
			type: 'array',
			items: {
				$ref: '#/definitions/slug',
			},
		},
	},
	required: ['id', 'name', 'label', 'content_type'],
	additionalProperties: false,
}

export default DocMetaSchema
