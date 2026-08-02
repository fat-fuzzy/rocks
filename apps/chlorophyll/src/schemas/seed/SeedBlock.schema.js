import ProseSchema from '../primitives/Prose.schema.js'

const SeedBlockSchema = {
	type: 'object',
	description:
		'Human-readable document in markdown with front matter. Aim: to remain human-readable while seeding tiptap editors.',

	properties: {
		name: {
			$ref: '#/definitions/slug',
		},
		content: ProseSchema,
		tags: {
			type: 'array',
			items: {
				$ref: '#/definitions/slug',
			},
		},
	},
	required: ['name', 'content', 'parent', 'tags'],
	additionalProperties: false,
}

export default SeedBlockSchema
