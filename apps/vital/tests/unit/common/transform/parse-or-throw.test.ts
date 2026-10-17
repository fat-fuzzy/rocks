import {describe, expect, test} from 'vitest'

import {
	parseBase,
	parseBlock,
	parseDateValue,
	parseDoc,
	parseLanguageValue,
	parsePathValue,
	parsePreset,
	parseSection,
	parseSlugValue,
	parseStructure,
} from '#lib/common/transform/parse-or-throw.js'

const UUID_A = '123e4567-e89b-12d3-a456-426614174000'
const UUID_B = '123e4567-e89b-12d3-a456-426614174001'
const UUID_C = '123e4567-e89b-12d3-a456-426614174002'
const FAILED_VALIDATION_PATTERN = /validation failed/

const validBlock = {
	content_type: 'block',
	id: UUID_A,
	name: 'intro',
	rank: 1,
	content: {
		html: '<p>Hello world</p>',
		json: {type: 'paragraph', children: [{text: 'Hello world'}]},
	},
	tags: ['welcome'],
	parentId: UUID_B,
} as const

const validSection = {
	content_type: 'section',
	id: UUID_B,
	name: 'overview',
	title: 'Overview',
	subtitle: 'A short intro',
	rank: 1,
	parentId: UUID_C,
	tags: ['welcome'],
	subsections: [
		{
			name: 'summary',
			parent: 'overview',
			rank: 1,
			blocks: [validBlock],
		},
	],
} as const

const validDoc = {
	schema_version: 1,
	id: UUID_C,
	meta: {
		id: UUID_C,
		name: 'guide',
		title: 'Guide',
		language: 'en',
		content_type: 'doc-root',
		format: 'article',
		visibility: 'public',
		tags: ['welcome'],
		rank: 1,
		group: 'docs',
	},
	path: {
		filename: 'guide',
		filetype: 'md',
		parent: '/docs',
	},
	sections: [validSection],
} as const

const validBase = {
	schema_version: 1,
	languages: ['en', 'fr'],
	formats: ['article', 'note'],
	tags: [{name: 'topic', title: 'Topic', items: ['design', 'writing']}],
	settings: [{name: 'visibility', title: 'Visibility', items: ['public']}],
} as const

const validStructure = {
	schema_version: 1,
	format: 'article',
	sections: ['intro', 'overview'],
	experience: ['read', 'write'],
} as const

const validPreset = {
	schema_version: 1,
	name: 'default',
	id: UUID_A,
	query: '?tag=welcome',
	locked: false,
} as const

describe('parse-or-throw.ts - validation helpers', () => {
	test('parseBlock accepts a valid block and rejects malformed data', () => {
		expect(parseBlock('block', validBlock)).toStrictEqual(validBlock)
		expect(() => parseBlock('block', {name: 'broken'})).toThrow(
			FAILED_VALIDATION_PATTERN,
		)
	})

	test('parseSection accepts a valid section and rejects invalid nested content', () => {
		expect(parseSection('section', validSection)).toStrictEqual(validSection)
		expect(() =>
			parseSection('section', {...validSection, rank: 'bad'}),
		).toThrow(FAILED_VALIDATION_PATTERN)
	})

	test('parseDoc accepts a valid document shape and rejects missing required metadata', () => {
		expect(parseDoc('doc', validDoc)).toStrictEqual(validDoc)
		expect(() =>
			parseDoc('doc', {...validDoc, meta: {...validDoc.meta, name: 123}}),
		).toThrow(FAILED_VALIDATION_PATTERN)
	})

	test('parsePreset accepts a valid preset and catches invalid values', () => {
		expect(parsePreset('preset', validPreset)).toStrictEqual(validPreset)
		expect(() =>
			parsePreset('preset', {...validPreset, id: 'not-a-uuid'}),
		).toThrow(FAILED_VALIDATION_PATTERN)
	})

	test('parseBase accepts a valid frontmatter base and rejects type mismatches', () => {
		expect(parseBase('base', validBase)).toStrictEqual(validBase)
		expect(() =>
			parseBase('base', {...validBase, languages: 'not-an-array'}),
		).toThrow(FAILED_VALIDATION_PATTERN)
	})

	test('parseStructure accepts a valid frontmatter structure and rejects missing format', () => {
		expect(parseStructure('structure', validStructure)).toStrictEqual(
			validStructure,
		)
		expect(() =>
			parseStructure('structure', {...validStructure, format: undefined}),
		).toThrow(FAILED_VALIDATION_PATTERN)
	})

	test('primitive parsers return a valid value and reject nullish or non-matching data', () => {
		expect(parseSlugValue('slug', 'hello-world')).toBe('hello-world')
		expect(() => parseSlugValue('slug', null)).toThrow(
			FAILED_VALIDATION_PATTERN,
		)

		expect(parseLanguageValue('language', 'en')).toBe('en')
		expect(() => parseLanguageValue('language', null)).toThrow(
			FAILED_VALIDATION_PATTERN,
		)

		expect(parsePathValue('path', '/docs/guide')).toBe('/docs/guide')
		expect(() => parsePathValue('path', 42)).toThrow(FAILED_VALIDATION_PATTERN)

		expect(parseDateValue('date', '2026-10-14')).toBe('2026-10-14')
		expect(() => parseDateValue('date', 'not-a-date')).toThrow(
			FAILED_VALIDATION_PATTERN,
		)
	})

	test('edge cases cover empty strings and missing required properties', () => {
		expect(() => parseSlugValue('slug', '')).toThrow(FAILED_VALIDATION_PATTERN)
		expect(() => parsePathValue('path', '')).toThrow(FAILED_VALIDATION_PATTERN)
		expect(() => parseBase('base', {})).toThrow(FAILED_VALIDATION_PATTERN)
		expect(() => parseDoc('doc', {})).toThrow(FAILED_VALIDATION_PATTERN)
	})
})
