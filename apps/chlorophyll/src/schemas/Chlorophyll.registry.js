import TagSchema from './primitives/Tag.schema.js'
import TagGroupSchema from './primitives/TagGroup.schema.js'
import ProseSchema from './primitives/Prose.schema.js'
import DocMetaSchema from './primitives/DocMeta.schema.js'
import DocPathSchema from './primitives/DocPath.schema.js'

import DocSchema from './domain/Doc.schema.js'
import SubsectionSchema from './domain/Subsection.schema.js'
import SectionSchema from './domain/Section.schema.js'
import BlockSchema from './domain/Block.schema.js'
import PresetSchema from './domain/Preset.schema.js'

import HumanSchema from './identity/Human.schema.js'
import RoleSchema from './identity/Role.schema.js'
import GroupSchema from './identity/Group.schema.js'

import FormBlockSchema from './forms/FormBlock.schema.js'
import FormSectionSchema from './forms/FormSection.schema.js'
import FormPresetSchema from './forms/FormPreset.schema.js'
import FormTagSchema from './forms/FormTag.schema.js'

import FrontmatterBaseSchema from './seed/FrontmatterBase.schema.js'
import FrontmatterStructureSchema from './seed/FrontmatterStructure.schema.js'
import SeedBlockSchema from './seed/SeedBlock.schema.js'
import SeedSectionSchema from './seed/SeedSection.schema.js'
import SeedDocSchema from './seed/SeedDoc.schema.js'

/**
 * @param schema {import('json-schema-to-typescript').JSONSchema | { properties: {schema_version: { const: string }}}} */
function getVersion(schema) {
	return schema?.properties?.schema_version?.const ?? null
}

export const schemas = {
	primitives: {
		Prose: {
			schema: ProseSchema,
			version: getVersion(DocSchema),
			isRoot: false,
		},
		Tag: {
			schema: TagSchema,
			version: getVersion(DocSchema),
			isRoot: false,
		},
		TagGroup: {
			schema: TagGroupSchema,
			version: getVersion(DocSchema),
			isRoot: false,
		},
	},
	seed: {
		FrontmatterBase: {
			schema: FrontmatterBaseSchema,
			version: getVersion(FrontmatterBaseSchema),
			isRoot: true,
		},
		FrontmatterStructure: {
			schema: FrontmatterStructureSchema,
			version: getVersion(FrontmatterStructureSchema),
			isRoot: true,
		},
		SeedBlock: {
			schema: SeedBlockSchema,
			version: getVersion(SeedDocSchema),
			isRoot: false,
		},
		SeedSection: {
			schema: SeedSectionSchema,
			version: getVersion(SeedDocSchema),
			isRoot: false,
		},
		SeedDoc: {
			schema: SeedDocSchema,
			version: getVersion(SeedDocSchema),
			isRoot: true,
		},
	},
	domain: {
		Doc: {
			schema: DocSchema,
			version: getVersion(DocSchema),
			isRoot: true,
		},
		Section: {
			schema: SectionSchema,
			version: getVersion(DocSchema),
			isRoot: false,
		},
		Subsection: {
			schema: SubsectionSchema,
			version: getVersion(DocSchema),
			isRoot: false,
		},
		Block: {
			schema: BlockSchema,
			version: getVersion(DocSchema),
			isRoot: false,
		},
		DocMeta: {
			schema: DocMetaSchema,
			version: getVersion(DocSchema),
			isRoot: false,
		},
		DocPath: {
			schema: DocPathSchema,
			version: getVersion(DocSchema),
			isRoot: false,
		},
		Preset: {
			schema: PresetSchema,
			version: getVersion(PresetSchema),
			isRoot: true,
		},
	},
	identity: {
		Human: {
			schema: HumanSchema,
			version: getVersion(HumanSchema),
			isRoot: true,
		},
		Role: {schema: RoleSchema, version: getVersion(HumanSchema), isRoot: false},
		Group: {
			schema: GroupSchema,
			version: getVersion(HumanSchema),
			isRoot: false,
		},
	},
	forms: {
		FormSection: {
			schema: FormSectionSchema,
			version: getVersion(FormSectionSchema),
			isRoot: true,
		},
		FormBlock: {
			schema: FormBlockSchema,
			version: getVersion(FormBlockSchema),
			isRoot: true,
		},
		FormPreset: {
			schema: FormPresetSchema,
			version: getVersion(FormPresetSchema),
			isRoot: true,
		},
		FormTag: {
			schema: FormTagSchema,
			version: getVersion(FormTagSchema),
			isRoot: true,
		},
	},
}

export const allSchemas = Object.values(schemas).flatMap(Object.values)
