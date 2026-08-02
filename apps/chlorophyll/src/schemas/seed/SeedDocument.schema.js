import BaseSchema from '../primitives/Base.schema.js'
import ProseSchema from '../primitives/Prose.schema.js'
import DocPathSchema from '../primitives/DocPath.schema.js'
import BlockSchema from '../domain/Block.schema.js'
import SeedSectionSchema from './SeedSection.schema.js'
import SeedMetaSchema from './SeedMeta.schema.js'
import SeedBlockSchema from './SeedBlock.schema.js'

/** @type {import('json-schema-to-typescript').JSONSchema} */
const SeedDocumentSchema = {
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'SeedDocument',
	type: 'object',
	description: 'Markdown Documents parsed and ready for initial app data seed',
	properties: {
		schema_version: {
			$ref: '#/definitions/schemaVersion',
			const: '0.1',
		},
		seed_type: {
			$ref: '#/definitions/seedType',
		},
		language: {
			$ref: '#/definitions/docLanguage',
		},
		format: {
			$ref: '#/definitions/docFormat',
		},
		sections: {
			type: 'array',
			items: {
				type: 'array',
				items: {
					$ref: '#/definitions/SeedSection',
				},
			},
		},
	},
	required: ['language', 'format', 'sections'],
	additionalProperties: false,
	definitions: {
		...BaseSchema,
		SeedMeta: SeedMetaSchema,
		DocPath: DocPathSchema,
		SeedSection: SeedSectionSchema,
		SeedBlock: SeedBlockSchema,
		Prose: ProseSchema,
		Block: BlockSchema,
	},
}

export default SeedDocumentSchema
