import {SCHEMA_VERSION} from '../../../config/setup.js'
import {defineSchema} from '../../index.js'

import BaseSchema from '../../primitives/Base.schema.js'
import HumanSchema from '../../identity/Human.schema.js'
import RoleSchema from '../../identity/Role.schema.js'
import GroupSchema from '../../identity/Group.schema.js'
import ProseSchema from '../../primitives/Prose.schema.js'

const OfferSchema = defineSchema({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'Offer',
	type: 'object',
	properties: {
		description: {
			type: 'string',
			const: 'Offer description',
		},
		schema_version: {
			$ref: '#/definitions/schemaVersion',
			const: SCHEMA_VERSION,
		},
		date_registered: {
			$ref: '#/definitions/dateString',
		},
		date_due: {
			$ref: '#/definitions/dateString',
		},
		company: {
			$ref: '#/definitions/title',
		},
		recruiter: {
			$ref: '#/definitions/Human',
		},
		content: {
			$ref: '#/definitions/Prose',
		},
	},
	required: [
		'schema_version',
		'date_registered',
		'date_due',
		'company',
		'recruiter',
		'content',
	],
	additionalProperties: false,
	definitions: {
		...BaseSchema,
		Human: HumanSchema,
		Role: RoleSchema,
		Group: GroupSchema,
		Prose: ProseSchema,
	},
})

export default OfferSchema
