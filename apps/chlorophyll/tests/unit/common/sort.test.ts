import {describe, test, expect} from 'vitest'
import {
	sortByNameAsc,
	sortByNameDesc,
	sortByRankAsc,
	sortByRankDesc,
} from '$lib/common/sort'
import type {Section, SeedSection} from '$types'

const SEED_DOC = {
	id: crypto.randomUUID(),
}

const SEED_SUBSECTION = {
	id: crypto.randomUUID(),
	name: 'seed-subsection',
}

const SEED_SECTIONS: SeedSection[] = [
	{
		path: {
			filename: 'section-1',
			filetype: 'json',
			parent: SEED_DOC.id,
		},
		meta: {
			id: crypto.randomUUID(),
			rank: 1,
			name: 'section-1',
			group: SEED_SUBSECTION.name,
			label: 'Seed Section 1',
			title: 'Seed Section 1',
			language: 'en',
			content_type: 'section',
			blocks: [
				{
					name: 'section-1-block-1',
					content: {
						html: '',
						json: {},
					},
					tags: [],
				},
			],
		},
		content: {
			html: '',
			json: {},
		},
	},
	{
		path: {
			filename: 'section-2',
			filetype: 'json',
			parent: SEED_DOC.id,
		},
		meta: {
			id: crypto.randomUUID(),
			rank: 2,
			name: 'section-2',
			group: SEED_SUBSECTION.name,
			label: 'Seed Section 2',
			title: 'Seed Section 2',
			language: 'en',
			content_type: 'section',
			blocks: [
				{
					name: 'section-2-block-1',
					content: {
						html: '',
						json: {},
					},
					tags: [],
				},
			],
		},
		content: {
			html: '',
			json: {},
		},
	},
]

const SECTIONS: Section[] = [
	{
		id: crypto.randomUUID(),
		parentId: SEED_DOC.id,
		rank: 1,
		name: 'section-1',
		title: 'Seed Section 1',
		content_type: 'section',
		subsections: [
			{
				name: 'section-1-sub-1',
				parent: 'section-1',
				rank: 1,
				blocks: [],
			},
		],
		content: {
			html: '',
			json: {},
		},
	},
	{
		id: crypto.randomUUID(),
		parentId: SEED_DOC.id,
		rank: 2,
		name: 'section-2',
		title: 'Seed Section 2',
		content_type: 'section',
		subsections: [
			{
				name: 'section-2-sub-1',
				parent: 'section-2',
				rank: 1,
				blocks: [],
			},
		],
		content: {
			html: '',
			json: {},
		},
	},
]

describe('sort.ts - sorting utilities', () => {
	test('sortByNameAsc', () => {
		let sorted = sortByNameAsc(SEED_SECTIONS[1], SEED_SECTIONS[0])

		expect(sorted).toBe(1)

		sorted = sortByNameAsc(SEED_SECTIONS[0], SEED_SECTIONS[1])

		expect(sorted).toBe(-1)

		sorted = sortByNameDesc(SEED_SECTIONS[0], SEED_SECTIONS[0])

		expect(sorted).toBe(0)
	})

	test('sortByNameDesc', () => {
		let sorted = sortByNameDesc(SEED_SECTIONS[0], SEED_SECTIONS[1])
		expect(sorted).toBe(1)

		sorted = sortByNameDesc(SEED_SECTIONS[1], SEED_SECTIONS[0])

		expect(sorted).toBe(-1)

		sorted = sortByNameDesc(SEED_SECTIONS[1], SEED_SECTIONS[1])

		expect(sorted).toBe(0)
	})

	test('sortByRankAsc', () => {
		let sorted = sortByRankAsc(SECTIONS[0], SECTIONS[1])

		expect(sorted).toBe(-1)

		sorted = sortByRankAsc(SECTIONS[1], SECTIONS[0])

		expect(sorted).toBe(1)

		sorted = sortByRankAsc(SECTIONS[1], SECTIONS[1])

		expect(sorted).toBe(0)
	})

	test('sortByRankDesc', () => {
		let sorted = sortByRankDesc(SECTIONS[0], SECTIONS[1])
		expect(sorted).toBe(1)

		sorted = sortByRankDesc(SECTIONS[1], SECTIONS[0])

		expect(sorted).toBe(-1)

		sorted = sortByRankDesc(SECTIONS[0], SECTIONS[0])

		expect(sorted).toBe(0)
	})
})
