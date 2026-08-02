import BaseSchema from '../primitives/Base.schema.js'
import DocMetaSchema from '../primitives/DocMeta.schema.js'
import DocPathSchema from '../primitives/DocPath.schema.js'
import ProseSchema from '../primitives/Prose.schema.js'
import TagSchema from '../primitives/Tag.schema.js'

import BlockSchema from './Block.schema.js'
import SectionSchema from './Section.schema.js'
import SubsectionSchema from './Subsection.schema.js'

/** @type {import('json-schema-to-typescript').JSONSchema} */
const DocumentSchema = {
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'Document',
	type: 'object',
	properties: {
		description: {
			type: 'string',
			const: 'Domain definitions of Document data',
		},
		schema_version: {
			$ref: '#/definitions/schemaVersion',
			const: '0.1',
		},
		id: {
			$ref: '#/definitions/uuid',
		},
		meta: {
			$ref: '#/definitions/DocMeta',
		},
		path: {$ref: '#/definitions/DocPath'}, // separated from meta
		sections: {
			type: 'array',
			items: {
				$ref: '#/definitions/Section',
			},
		},
	},
	required: ['schema_version', 'id', 'meta', 'path', 'sections'],
	additionalProperties: false,
	definitions: {
		...BaseSchema,
		DocMeta: DocMetaSchema,
		DocPath: DocPathSchema,
		Prose: ProseSchema,
		Block: BlockSchema,
		Tag: TagSchema,
		Section: SectionSchema,
		Subsection: SubsectionSchema,
	},
}

export default DocumentSchema
