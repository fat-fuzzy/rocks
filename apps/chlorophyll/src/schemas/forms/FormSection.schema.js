import FormBaseSchema from '../primitives/FormBase.schema.js'

/** @type {import('json-schema-to-typescript').JSONSchema} */
const FormSectionSchema = /** @type {const} */ {
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'FormSection',
	type: 'object',
	properties: {
		description: {
			type: 'string',
			const: 'Validation schema for Section create/update form',
		},
		schema_version: {
			$ref: '#/definitions/schemaVersion',
			const: '0.1',
		},
		name: {
			$ref: '#/definitions/slug',
		},
		rank: {
			$ref: '#/definitions/rank',
		},
		title: {
			$ref: '#/definitions/title',
		},
		formats: {
			$ref: '#/definitions/docFormat',
		},
	},
	required: ['name', 'rank'],
	additionalProperties: false,
	definitions: FormBaseSchema,
}

export default FormSectionSchema
