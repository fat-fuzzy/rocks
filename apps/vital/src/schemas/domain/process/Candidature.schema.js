import {SCHEMA_VERSION} from '../../../config/setup.js'
import {defineSchema} from '../../index.js'

import BaseSchema from '../../primitives/Base.schema.js'
import ExternalEventSchema from '../../primitives/ExternalEvent.schema.js'
import OfferSchema from './Offer.schema.js'
import SealSchema from './Seal.schema.js'

import DocMetaSchema from '../../primitives/DocMeta.schema.js'
import DocPathSchema from '../../primitives/DocPath.schema.js'
import ProseSchema from '../../primitives/Prose.schema.js'
import TagSchema from '../../primitives/Tag.schema.js'

import HumanSchema from '../../identity/Human.schema.js'
import RoleSchema from '../../identity/Role.schema.js'
import GroupSchema from '../../identity/Group.schema.js'

import BlockSchema from '../document/Block.schema.js'
import SectionSchema from '../document/Section.schema.js'
import SubsectionSchema from '../document/Subsection.schema.js'
import DocSchema from '../document/Doc.schema.js'

// sketch only: names of $refs are guesses, check them against your primitives
const CandidatureSchema = defineSchema({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'Candidature',
	type: 'object',
	properties: {
		description: {
			type: 'string',
			const: 'Candidature process for a job',
		},
		schema_version: {
			$ref: '#/definitions/schemaVersion',
			const: SCHEMA_VERSION,
		},
		id: {
			$ref: '#/definitions/uuid',
		},
		name: {
			$ref: '#/definitions/slug',
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
			items: SealSchema,
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
