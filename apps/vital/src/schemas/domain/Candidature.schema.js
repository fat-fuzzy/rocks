import {SCHEMA_VERSION} from '../../config/setup.js'
import {defineSchema} from '../index.js'

import BaseSchema from '../primitives/Base.schema.js'
import ExternalEventSchema from '../primitives/ExternalEvent.schema.js'
import OfferSchema from './Offer.schema.js'
import ArchiveSchema from './Archive.schema.js'

import DocMetaSchema from '../primitives/DocMeta.schema.js'
import DocPathSchema from '../primitives/DocPath.schema.js'
import ProseSchema from '../primitives/Prose.schema.js'
import TagSchema from '../primitives/Tag.schema.js'

import HumanSchema from '../identity/Human.schema.js'
import RoleSchema from '../identity/Role.schema.js'
import GroupSchema from '../identity/Group.schema.js'

import BlockSchema from './Block.schema.js'
import SectionSchema from './Section.schema.js'
import SubsectionSchema from './Subsection.schema.js'
import DocSchema from './Doc.schema.js'

// sketch only: names of $refs are guesses, check them against your primitives
const CandidatureSchema = defineSchema({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'Candidature',
	type: 'object',
	properties: {
		schema_version: {
			$ref: '#/definitions/schemaVersion',
			const: SCHEMA_VERSION,
		},
		id: {
			$ref: '#/definitions/uuid',
		},
		title: {
			$ref: '#/definitions/title',
		},
		date_created: {
			$ref: '#/definitions/dateString',
		},
		date_archived: {
			$ref: '#/definitions/dateString',
		},
		events: {
			type: 'array',
			items: ExternalEventSchema,
		},
		seals: {
			type: 'array',
			items: ArchiveSchema,
		},
		preset_id: {$ref: '#/definitions/uuid'},
		offer: OfferSchema,
	},
	required: ['schema_version', 'id', 'date_created', 'events', 'seals'],
	additionalProperties: false,
	definitions: {
		...BaseSchema,
		Human: HumanSchema,
		Role: RoleSchema,
		Group: GroupSchema,
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

export default CandidatureSchema
