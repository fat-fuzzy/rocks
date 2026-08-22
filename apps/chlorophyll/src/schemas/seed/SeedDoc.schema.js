import {SCHEMA_VERSION} from '../../config/setup.js'
import {defineSchema} from '../index.js'

import BaseSchema from '../primitives/Base.schema.js'
import ProseSchema from '../primitives/Prose.schema.js'
import DocPathSchema from '../primitives/DocPath.schema.js'
import BlockSchema from '../domain/Block.schema.js'
import SeedSectionSchema from './SeedSection.schema.js'
import SeedMetaSchema from './SeedMeta.schema.js'
import SeedBlockSchema from './SeedBlock.schema.js'

const SeedDocSchema = defineSchema({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'SeedDoc',
	type: 'object',
	description: 'Markdown Docs parsed and ready for initial app data seed',
	properties: {
		schema_version: {
			$ref: '#/definitions/schemaVersion',
			const: SCHEMA_VERSION,
		},
		seed_type: {
			$ref: '#/definitions/seedType',
		},
		language: {
			$ref: '#/definitions/docLanguage',
		},
		format: {
			$ref: '#/definitions/slug',
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
})

export default SeedDocSchema
