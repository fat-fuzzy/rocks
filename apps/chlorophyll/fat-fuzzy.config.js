/**
 * Chlorophyll schemas config
 */
export default {
	validation: {
		// where the consumer's JSON Schema files live
		schemasDir: 'src/lib/generated/ajv/schemas',

		// where generated files are written
		outDir: 'src/lib/generated/ajv/validation',

		// per-schema: 'extend' merges with built-in, 'replace' fully substitutes it
		// key = built-in schema name, value = { file, exportName, $id, mode }
		schemas: {
			Tag: {
				file: 'Tag.schema.json',
				exportName: 'TagValidationFunction',
				$id: '#/definitions/Tag',
				mode: 'replace',
			},
			TagGroup: {
				file: 'TagGroup.schema.json',
				exportName: 'TagGroupValidationFunction',
				$id: '#/definitions/TagGroup',
				mode: 'replace',
			},
			Prose: {
				file: 'Prose.schema.json',
				exportName: 'ProseValidationFunction',
				$id: '#/definitions/Prose',
				mode: 'replace',
			},
			DocMeta: {
				file: 'DocMeta.schema.json',
				exportName: 'DocMetaValidationFunction',
				$id: '#/definitions/DocMeta',
				mode: 'replace',
			},
			DocPath: {
				file: 'DocPath.schema.json',
				exportName: 'DocPathValidationFunction',
				$id: '#/definitions/DocPath',
				mode: 'replace',
			},
			Block: {
				file: 'Block.schema.json',
				exportName: 'BlockValidationFunction',
				$id: '#/definitions/Block',
				mode: 'replace',
			},
			Subsection: {
				file: 'Subsection.schema.json',
				exportName: 'SubsectionValidationFunction',
				$id: '#/definitions/Subsection',
				mode: 'replace',
			},
			Section: {
				file: 'Section.schema.json',
				exportName: 'SectionValidationFunction',
				$id: '#/definitions/Section',
				mode: 'replace',
			},
			Doc: {
				file: 'Doc.schema.json',
				exportName: 'DocValidationFunction',
				$id: '#/definitions/Doc',
				mode: 'replace',
			},
			Preset: {
				file: 'Preset.schema.json',
				exportName: 'PresetValidationFunction',
				$id: '#/definitions/Preset',
				mode: 'replace',
			},
			Human: {
				file: 'Human.schema.json',
				exportName: 'HumanValidationFunction',
				$id: '#/definitions/Human',
				mode: 'replace',
			},
			Role: {
				file: 'Role.schema.json',
				exportName: 'RoleValidationFunction',
				$id: '#/definitions/Role',
				mode: 'replace',
			},
			Group: {
				file: 'Group.schema.json',
				exportName: 'GroupValidationFunction',
				$id: '#/definitions/Group',
				mode: 'replace',
			},
			FormBlock: {
				file: 'FormBlock.schema.json',
				exportName: 'FormBlockValidationFunction',
				$id: '#/definitions/FormBlock',
				mode: 'replace',
			},
			FormSection: {
				file: 'FormSection.schema.json',
				exportName: 'FormSectionValidationFunction',
				$id: '#/definitions/FormSection',
				mode: 'replace',
			},
			FormPreset: {
				file: 'FormPreset.schema.json',
				exportName: 'FormPresetValidationFunction',
				$id: '#/definitions/FormPreset',
				mode: 'replace',
			},
			FormTag: {
				file: 'FormTag.schema.json',
				exportName: 'FormTagValidationFunction',
				$id: '#/definitions/FormTag',
				mode: 'replace',
			},
			FormLanguage: {
				file: 'FormLanguage.schema.json',
				exportName: 'FormLanguageValidationFunction',
				$id: '#/definitions/FormLanguage',
				mode: 'replace',
			},
			FrontmatterBase: {
				file: 'FrontmatterBase.schema.json',
				exportName: 'FrontmatterBaseValidationFunction',
				$id: '#/definitions/FrontmatterBase',
				mode: 'replace',
			},
			FrontmatterStructure: {
				file: 'FrontmatterStructure.schema.json',
				exportName: 'FrontmatterStructureValidationFunction',
				$id: '#/definitions/FrontmatterStructure',
				mode: 'replace',
			},
		},
		ajvOptions: {
			removeAdditional: true, // strip unknown fields from user imports
			coerceTypes: true, // "123" → 123, "true" → true
			useDefaults: true, // fill in schema `default` values automatically
		},
	},
}
