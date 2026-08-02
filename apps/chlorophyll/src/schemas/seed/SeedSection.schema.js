import ProseSchema from '../primitives/Prose.schema.js'

const SeedSectionSchema = {
	type: 'object',
	description:
		'Human-readable document in markdown with front matter. Aim: to remain human-readable while seeding tiptap editors.',
	properties: {
		path: {
			$ref: '#/definitions/DocPath',
		},
		meta: {
			$ref: '#/definitions/SeedMeta',
		},
		content: ProseSchema,
	},
	required: ['path', 'meta', 'content'],
	additionalProperties: false,
}

export default SeedSectionSchema
