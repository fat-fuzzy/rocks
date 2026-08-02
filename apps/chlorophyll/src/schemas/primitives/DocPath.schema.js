const DocPathSchema = {
	type: 'object',
	properties: {
		filename: {
			$ref: '#/definitions/slug',
		},
		filetype: {
			$ref: '#/definitions/fileExt',
		},
		parent: {
			$ref: '#/definitions/path',
		},
	},
	required: ['filename', 'filetype'],
	additionalProperties: false,
}

export default DocPathSchema
