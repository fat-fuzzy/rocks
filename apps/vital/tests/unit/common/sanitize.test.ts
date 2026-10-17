import {describe, expect, test} from 'vitest'

import {
	sanitizeBase,
	sanitizeBlock,
	sanitizeDateStringValue,
	sanitizeDoc,
	sanitizeFileName,
	sanitizeLanguageValue,
	sanitizePathValue,
	sanitizePreset,
	sanitizeSection,
	sanitizeSlugValue,
	sanitizeStructure,
	sanitizeUuidValue,
} from '#lib/common/sanitize.js'

const CONTAINS_PATH_TRAVERSAL = {
	root: '/',
	parent: '../',
	grandparent: '../../../',
}

const CONTAINS_FORBIDDEN_CHARS = [
	'@script',
	'<script',
	'script>',
	';script',
	'{script',
	'script;',
	'scr?ipt',
	'scr!ipt',
]

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

const validPreset = {
	schema_version: 1,
	name: 'default',
	id: UUID_A,
	query: '?tag=welcome',
	locked: false,
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

describe('sanitize.ts - filename and typed sanitizers', () => {
	test('sanitizeFileName strips forbidden characters', () => {
		const sanitized = CONTAINS_FORBIDDEN_CHARS.map((filename) =>
			sanitizeFileName(filename),
		)

		sanitized.forEach((result) => {
			expect(result).toBe('script')
		})
		expect(sanitizeFileName('cv_backup-2026.10.17')).toBe(
			'cv_backup-2026.10.17',
		)
	})

	test('sanitizeFileName rejects path traversal', () => {
		expect(() => sanitizeFileName(CONTAINS_PATH_TRAVERSAL.root)).toThrow(
			'Invalid filename',
		)
		expect(() => sanitizeFileName(CONTAINS_PATH_TRAVERSAL.parent)).toThrow(
			'Invalid filename',
		)
		expect(() => sanitizeFileName(CONTAINS_PATH_TRAVERSAL.grandparent)).toThrow(
			'Invalid filename',
		)
	})

	test('structured payload sanitizers keep valid payloads and null invalid payloads', () => {
		expect(sanitizeBlock(validBlock)).toEqual(validBlock)
		expect(sanitizeSection(validSection)).toEqual(validSection)
		expect(sanitizeDoc(validDoc)).toEqual(validDoc)
		expect(sanitizePreset(validPreset)).toEqual(validPreset)
		expect(sanitizeBase(validBase)).toEqual(validBase)
		expect(sanitizeStructure(validStructure)).toEqual(validStructure)

		expect(sanitizeBlock({name: 'broken'})).toBeNull()
		expect(sanitizeSection({...validSection, rank: 'bad'})).toBeNull()
		expect(
			sanitizeDoc({...validDoc, meta: {...validDoc.meta, name: ''}}),
		).toBeNull()
		expect(sanitizePreset({...validPreset, id: 'not-a-uuid'})).toBeNull()
		expect(sanitizeBase({...validBase, schema_version: 'bad'})).toBeNull()
		expect(sanitizeStructure({...validStructure, format: ''})).toBeNull()
	})

	test('primitive sanitizers return typed values or null', () => {
		expect(sanitizeSlugValue('hello-world')).toBe('hello-world')
		expect(sanitizeSlugValue('')).toBeNull()

		expect(sanitizeLanguageValue('en')).toBe('en')
		expect(sanitizeLanguageValue('fre')).toBeNull()

		expect(sanitizePathValue('/docs/guide')).toBe('/docs/guide')
		expect(sanitizePathValue('')).toBeNull()

		expect(sanitizeDateStringValue('2026-10-17')).toBe('2026-10-17')
		expect(sanitizeDateStringValue('17-10-2026')).toBeNull()

		expect(sanitizeUuidValue(UUID_A)).toBe(UUID_A)
		expect(sanitizeUuidValue('not-a-uuid')).toBeNull()
	})
})
