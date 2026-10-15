import {describe, expect, test} from 'vitest'

import {
	isRawBase,
	isRawDoc,
	isRawPreset,
	isRawSchema,
	isRawSection,
	isRawStructure,
	isRawStructureTree,
	isRecord,
	isSection,
	parseSchemaVersion,
	rawBaseToBase,
	rawDocToDoc,
	rawPresetToPreset,
	rawSectionToSection,
	rawStructureToStructure,
	rawStructureTreeToStructure,
	rawToSection,
} from '#lib/common/transform/raw-to-typed.js'

const UUID_A = '123e4567-e89b-12d3-a456-426614174000'
const UUID_B = '123e4567-e89b-12d3-a456-426614174001'
const UUID_C = '123e4567-e89b-12d3-a456-426614174002'

const section = {
	content_type: 'section',
	id: UUID_A,
	name: 'overview',
	title: 'Overview',
	rank: 1,
	parentId: UUID_B,
	tags: ['welcome'],
	subsections: [
		{
			name: 'summary',
			parent: 'overview',
			rank: 1,
			blocks: [],
		},
	],
} as const

const rawSection = {
	meta: {
		id: UUID_A,
		name: 'overview',
		language: 'en',
		format: 'article',
		content_type: 'section',
	},
	content: section,
} as const

const preset = {
	schema_version: 1,
	name: 'default',
	id: UUID_A,
	query: 'tag:welcome',
	locked: false,
} as const

const rawPreset = {
	meta: {
		id: UUID_A,
		name: 'default',
		language: 'en',
		format: 'preset',
	},
	content: preset,
} as const

const base = {
	schema_version: 1,
	languages: ['en', 'fr'],
	formats: ['article', 'note'],
	tags: [{name: 'topic', title: 'Topic', items: ['design']}],
	settings: [{name: 'visibility', title: 'Visibility', items: ['public']}],
} as const

const rawBase = {
	meta: {
		id: UUID_B,
		name: 'base',
		language: 'en',
		format: 'article',
	},
	content: base,
} as const

const structure = {
	schema_version: 1,
	format: 'article',
	sections: ['intro', 'overview'],
	experience: ['read'],
} as const

const rawStructure = {
	meta: {
		id: UUID_C,
		name: 'structure',
		language: 'en',
		format: 'article',
	},
	content: structure,
} as const

const rawStructureTree = {
	meta: {
		id: UUID_C,
		name: 'structure-tree',
		language: 'en',
		format: 'article',
	},
	content: {
		structure: [structure],
	},
} as const

const rawDoc = {
	meta: {
		id: UUID_B,
		name: 'guide',
		language: 'fr',
		format: 'article',
	},
	content: {
		schema_version: '0.1',
		id: UUID_B,
		path: {
			filename: 'guide',
			filetype: 'md',
			parent: '/docs',
		},
	},
	overview: rawSection,
} as const

describe('raw-to-typed.ts - raw-to-typed helpers', () => {
	test('parseSchemaVersion accepts finite numbers and legacy 0.1 string', () => {
		expect(parseSchemaVersion(1)).toBe(1)
		expect(parseSchemaVersion(1.5)).toBe(1.5)
		expect(parseSchemaVersion('0.1')).toBe(0.1)
	})

	test('parseSchemaVersion rejects unsupported values', () => {
		expect(parseSchemaVersion('1.2')).toBeNull()
		expect(parseSchemaVersion('draft')).toBeNull()
		expect(parseSchemaVersion(null)).toBeNull()
		expect(parseSchemaVersion(Infinity)).toBeNull()
		expect(parseSchemaVersion(NaN)).toBeNull()
	})

	test('isRecord accepts plain objects and rejects nullish values', () => {
		expect(isRecord({})).toBe(true)
		expect(isRecord({schema_version: 1})).toBe(true)
		expect(isRecord(null)).toBe(false)
		expect(isRecord('nope')).toBe(false)
		expect(isRecord(undefined)).toBe(false)
	})

	test('isRawSchema and isSection detect schema-like and section-like objects correctly', () => {
		expect(isRawSchema({schema_version: 1, foo: 'bar'})).toBe(true)
		expect(isRawSchema({foo: 'bar'})).toBe(false)
		expect(isSection(section)).toBe(true)
		expect(isSection({name: 'x'})).toBe(false)
		expect(isSection(null)).toBe(false)
	})

	test('rawToSection is an identity helper', () => {
		// @ts-expect-error section=section
		expect(rawToSection(section)).toBe(section)
	})

	test('raw section helpers detect and unwrap raw sections correctly', () => {
		expect(isRawSection(rawSection)).toBe(true)
		expect(isRawSection({content: {}})).toBe(false)

		// @ts-expect-error isRawSection is true at this point
		expect(rawSectionToSection(rawSection)).toStrictEqual(section)
	})

	test('raw doc helpers detect and convert raw doc section entries correctly', () => {
		expect(isRawDoc(rawDoc)).toBe(true)
		expect(isRawDoc({content: {}})).toBe(false)
		expect(rawDocToDoc(rawDoc)).toStrictEqual([section])
	})

	test('raw preset helpers unwrap valid preset payloads and reject invalid ones', () => {
		expect(isRawPreset(rawPreset)).toBe(true)
		expect(isRawPreset({meta: {}, content: {}})).toBe(false)

		// @ts-expect-error isRawPreset is true at this point
		expect(rawPresetToPreset(rawPreset)).toStrictEqual(preset)
	})

	test('raw base helpers unwrap valid base payloads and reject invalid ones', () => {
		expect(isRawBase(rawBase)).toBe(true)
		expect(isRawBase({meta: {}, content: {}})).toBe(false)

		// @ts-expect-error isRawBase is true at this point
		expect(rawBaseToBase(rawBase)).toStrictEqual(base)
	})

	test('raw structure helpers unwrap structure trees and structure payloads', () => {
		expect(isRawStructureTree(rawStructureTree)).toBe(true)
		expect(isRawStructureTree({meta: {}, content: {}})).toBe(false)

		// @ts-expect-error isRawStructureTree is true at this point
		expect(rawStructureTreeToStructure(rawStructureTree)).toStrictEqual([
			structure,
		])

		expect(isRawStructure(rawStructure)).toBe(true)
		expect(isRawStructure({meta: {}, content: {}})).toBe(false)

		// @ts-expect-error isRawStructure is true at this point
		expect(rawStructureToStructure(rawStructure)).toStrictEqual(structure)
	})
})
