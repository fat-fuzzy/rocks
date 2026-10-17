import type {Block, DocStore, PresetStore, Section, TagGroup} from '#types'

import {describe, expect, test} from 'vitest'

import {
	buildDocIndex,
	buildPresetIndex,
	buildTagIndex,
} from '#lib/common/transform/store-to-index.js'
import {
	getBlockKey,
	getPresetKey,
	getSectionKey,
	getSubsectionKey,
	getTagKey,
} from '#lib/common/format.js'

const blockA: Block = {
	content_type: 'block',
	id: 'block-1',
	name: 'intro',
	rank: 1,
	content: {html: '<p>Intro</p>', json: {}},
	tags: ['design'],
	parentId: 'section-1',
} as const

const blockB: Block = {
	content_type: 'block',
	id: 'block-2',
	name: 'skills',
	rank: 2,
	content: {html: '<p>Skills</p>', json: {}},
	tags: ['writing'],
	parentId: 'section-1',
} as const

const section: Section = {
	content_type: 'section',
	id: 'section-1',
	name: 'overview',
	title: 'Overview',
	rank: 1,
	parentId: 'doc-root',
	tags: ['welcome'],
	subsections: [
		{
			name: 'summary',
			parent: 'overview',
			rank: 1,
			blocks: [blockA, blockB],
		},
	],
} as const

const docStore: DocStore = {
	en: {
		long: {
			id: 'doc-1',
			schema_version: 1,
			meta: {
				id: 'doc-1',
				name: 'doc-root',
				content_type: 'section',
				language: 'en',
				format: 'long',
			},
			path: {
				filename: 'doc-root',
				filetype: 'json',
			},
			sections: [section],
		},
	},
} as const

const presetStore: PresetStore = {
	default: {
		schema_version: 1,
		name: 'default',
		id: 'preset-1',
		query: '?language=en&format=long',
		locked: false,
	},
	copy: {
		schema_version: 1,
		name: 'copy',
		id: 'preset-2',
		query: '?language=fr&format=short',
		locked: true,
	},
} as const

const groups: TagGroup[] = [
	{name: 'topic', title: 'Topic', items: ['design', 'writing']},
	{name: 'status', title: 'Status', items: ['draft']},
]

describe('store-to-index.ts - store indexing helpers', () => {
	describe('buildDocIndex', () => {
		test('indexes sections, subsections, and blocks by key', () => {
			const index = buildDocIndex(docStore)

			const sectionKey = getSectionKey('en', 'long', 'overview')
			const subsectionKey = getSubsectionKey(
				'en',
				'long',
				'overview',
				'summary',
			)
			const blockKey1 = getBlockKey(
				'en',
				'long',
				'overview',
				'intro',
				'summary',
			)
			const blockKey2 = getBlockKey(
				'en',
				'long',
				'overview',
				'skills',
				'summary',
			)

			expect(index.sections[sectionKey]).toStrictEqual(section)
			expect(index.sectionsById[section.id]).toStrictEqual(section)
			expect(index.subsections[subsectionKey]).toStrictEqual(
				section.subsections?.[0],
			)
			expect(index.blocks[blockKey1]).toStrictEqual(blockA)
			expect(index.blocks[blockKey2]).toStrictEqual(blockB)
		})

		test('ignores entries without a language or document', () => {
			const result = buildDocIndex({
				'': undefined,
				en: {long: undefined},
			})

			expect(result).toStrictEqual({
				sections: {},
				sectionsById: {},
				subsections: {},
				blocks: {},
			})
		})
	})

	test('buildPresetIndex builds keyed preset records from the store', () => {
		const result = buildPresetIndex(presetStore)
		let key = getPresetKey('default')
		expect(key).not.toBe(null)

		if (key) {
			expect(result.presets[key]).toStrictEqual(presetStore.default)
		}

		key = getPresetKey('copy')
		expect(key).not.toBe(null)
		if (key) {
			expect(result.presets[key]).toStrictEqual(presetStore.copy)
		}
	})
	describe('buildDocIndex', () => {
		test('aggregates groups and block tags by lookup key', () => {
			const blocks = [blockA, blockB]
			const result = buildTagIndex(groups, blocks)

			expect(result.tags).toStrictEqual({
				topic: ['design', 'writing'],
				status: ['draft'],
			})
			expect(result.taggedBlocks[getTagKey('topic', 'design')]).toStrictEqual([
				blockA,
			])
			expect(result.taggedBlocks[getTagKey('topic', 'writing')]).toStrictEqual([
				blockB,
			])
		})

		test('throws when a block tag is not present in any tag group', () => {
			expect(() =>
				buildTagIndex(groups, [
					{
						...blockA,
						tags: ['missing:tag'],
					},
				]),
			).toThrow(/No tag group found for missing:tag/)
		})
	})
})
