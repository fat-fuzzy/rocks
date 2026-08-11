import {defineSchema} from '../index.js'

const DocPathSchema = defineSchema({
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
})

export default DocPathSchema
