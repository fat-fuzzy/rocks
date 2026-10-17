import {describe, expect, test} from 'vitest'

import {
	BlockValidator,
	DateStringValidator,
	DocValidator,
	FormBlockValidator,
	FormFormatValidator,
	FormLanguageValidator,
	FormPresetValidator,
	FormSectionValidator,
	FormTagValidator,
	FrontmatterBaseValidator,
	FrontmatterStructureValidator,
	LanguageValidator,
	PathValidator,
	PresetValidator,
	SectionValidator,
	SlugValidator,
	UuidValidator,
} from '#lib/common/validate.js'

const UUID_A = '123e4567-e89b-12d3-a456-426614174000'
const UUID_B = '123e4567-e89b-12d3-a456-426614174001'
const UUID_C = '123e4567-e89b-12d3-a456-426614174002'

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

/**
 * NOTE: `any` types are used for testing purposes and are therefore ignored
 */
describe('validate.ts - generated AJV wrappers', () => {
	describe('core validators', () => {
		test('accept valid doc and section payloads', () => {
			expect(BlockValidator(validBlock)).toBe(true)
			expect(SectionValidator(validSection)).toBe(true)
			expect(DocValidator(validDoc)).toBe(true)
			expect(PresetValidator(validPreset)).toBe(true)
			expect(FrontmatterBaseValidator(validBase)).toBe(true)
			expect(FrontmatterStructureValidator(validStructure)).toBe(true)
		})

		test('reject malformed payloads and expose errors', () => {
			// eslint-disable-next-line
			expect(BlockValidator({name: 'broken'} as any)).toBe(false)
			expect(Array.isArray(BlockValidator.errors)).toBe(true)
			expect(BlockValidator.errors).not.toHaveLength(0)

			// eslint-disable-next-line
			expect(SectionValidator({...validSection, rank: 'nope'} as any)).toBe(
				false,
			)
			expect(
				// eslint-disable-next-line
				DocValidator({...validDoc, meta: {...validDoc.meta, name: 123}} as any),
			).toBe(false)
			// eslint-disable-next-line
			expect(PresetValidator({...validPreset, id: 'not-a-uuid'} as any)).toBe(
				false,
			)
		})
	})

	test('primitive validators validate wrapped values and reject invalid input', () => {
		expect(SlugValidator({value: 'hello-world'})).toBe(true)
		expect(SlugValidator({value: ''})).toBe(false)
		expect(UuidValidator({value: UUID_A})).toBe(true)
		expect(UuidValidator({value: 'not-a-uuid'})).toBe(false)
		expect(LanguageValidator({value: 'en'})).toBe(true)
		// eslint-disable-next-line
		expect(LanguageValidator({value: 42 as any})).toBe(false)
		expect(LanguageValidator({value: 'fre'})).toBe(false)
		expect(PathValidator({value: '/docs/guide'})).toBe(true)
		expect(PathValidator({value: ''})).toBe(false)
		expect(DateStringValidator({value: '2026-10-17'})).toBe(true)
		expect(DateStringValidator({value: 'not-a-date'})).toBe(false)
	})

	describe('form validators', () => {
		test('accept standard create/update payloads', () => {
			expect(
				FormBlockValidator({
					parent: 'overview',
					name: 'intro',
					rank: 1,
					tags: ['design'],
				}),
			).toBe(true)
			expect(
				FormSectionValidator({
					name: 'overview',
					rank: 1,
					title: 'Overview',
				}),
			).toBe(true)
			expect(FormFormatValidator({name: 'article'})).toBe(true)
			expect(FormPresetValidator({name: 'default'})).toBe(true)
			expect(
				FormTagValidator({
					name: 'topic',
					group: 'topic',
					groupTitle: 'Topic',
				}),
			).toBe(true)
			expect(FormLanguageValidator({name: 'en'})).toBe(true)
		})

		test('reject invalid payloads', () => {
			expect(FormPresetValidator({name: ''})).toBe(false)
			expect(FormTagValidator({name: '', group: ''})).toBe(false)
			expect(FormLanguageValidator({name: ''})).toBe(false)
		})
	})
})
