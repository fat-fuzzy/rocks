import {SCHEMA_VERSION} from '../../config/setup.js'
import {defineSchema} from '../index.js'

import BaseSchema from '../primitives/Base.schema.js'
import DocMetaSchema from '../primitives/DocMeta.schema.js'
import DocPathSchema from '../primitives/DocPath.schema.js'
import ProseSchema from '../primitives/Prose.schema.js'
import TagSchema from '../primitives/Tag.schema.js'

import BlockSchema from './Block.schema.js'
import SectionSchema from './Section.schema.js'
import SubsectionSchema from './Subsection.schema.js'
import DocSchema from './Doc.schema.js'

const ArchiveSchema = defineSchema({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'Archive',
	type: 'object',
	properties: {
		description: {
			type: 'string',
			const: 'Reference to a Doc instance with sealed content',
		},
		schema_version: {
			$ref: '#/definitions/schemaVersion',
			const: SCHEMA_VERSION,
		},
		id: {
			$ref: '#/definitions/uuid',
		},
		label: {
			$ref: '#/definitions/slug',
		}, // 'sent'
		date_sealed: {
			$ref: '#/definitions/dateString',
		},
		fingerprint: {
			type: 'string', // hash
		},
		content: {
			$ref: '#/definitions/Doc', // resolved blocks, canonical Tiptap JSON
		},
	},
	required: ['id', 'label', 'date_sealed', 'fingerprint', 'content'],
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
		Doc: DocSchema,
	},
})

export default ArchiveSchema
