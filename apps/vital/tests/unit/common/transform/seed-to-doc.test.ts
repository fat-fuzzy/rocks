import type {SeedDoc} from '#types'

import {beforeEach, describe, expect, test, vi} from 'vitest'
import {seedDocToDoc} from '#lib/common/transform/seed-to-doc.js'

type UUID = ReturnType<Crypto['randomUUID']>

// const ids = ['doc-id', 'section-id', 'block-id']
const ids: UUID[] = [
	'123e4567-e89b-12d3-a456-426614174000',
	'123e4567-e89b-12d3-a456-426614174001',
	'123e4567-e89b-12d3-a456-426614174002',
]

describe('seed-to-doc.ts - transform SeedDoc data to Doc object', () => {
	beforeEach(() => {
		let i = 0

		vi.spyOn(globalThis.crypto, 'randomUUID').mockImplementation((): UUID => {
			const next = ids[i]
			i += 1
			return (
				next ??
				(`00000000-0000-4000-8000-${String(i).padStart(12, '0')}` as UUID)
			)
		})
	})

	test('creates doc metadata and section subtree for section groups with blocks', () => {
		const seed = {
			schema_version: '0.1',
			seed_type: 'root',
			language: 'en',
			format: 'long',
			sections: [
				[
					{
						path: {
							filename: 'section-1',
							filetype: 'json',
							parent: 'section-1',
						},
						meta: {
							name: 'section-1',
							title: 'Section 1',
							subtitle: 'Subtitle 1',
							blocks: [
								{
									name: 'block-1',
									content: {html: '<p>x</p>', json: {}},
									tags: ['t1'],
								},
							],
						},
						content: {html: '', json: {}},
					},
				],
			],
		} as unknown as SeedDoc

		const doc = seedDocToDoc(seed)

		expect(doc.id).toBe(ids[0])
		expect(doc.meta.id).toBe(ids[0])
		expect(doc.meta.name).toBe('en-long')
		expect(doc.path).toEqual({filename: 'en-long', filetype: 'json'})

		expect(doc.sections).toHaveLength(1)
		const [section] = doc.sections
		expect(section.id).toBe(ids[1])
		expect(section.parentId).toBe(ids[0])
		expect(section.name).toBe('section-1')
		expect(section.content).toBeUndefined()
		expect(section.subsections).toHaveLength(1)

		const [sub] = section.subsections || []
		expect(sub.parent).toBe('section-1')
		expect(sub.blocks).toHaveLength(1)
		expect(sub.blocks[0]).toMatchObject({
			id: ids[2],
			name: 'block-1',
			group: 'section-1',
			parentId: ids[1],
			rank: 1,
			content_type: 'block',
		})
	})

	test('keeps section content when section has one item and no blocks', () => {
		const seed = {
			schema_version: '0.1',
			seed_type: 'root',
			language: 'fr',
			format: 'long',
			sections: [
				[
					{
						path: {filename: 'intro', filetype: 'json', parent: 'doc-root'},
						meta: {
							name: 'intro',
							title: 'Introduction',
							subtitle: 'Sub',
						},
						content: {html: '<p>intro</p>', json: {type: 'doc'}},
					},
				],
			],
		} as unknown as SeedDoc

		const doc = seedDocToDoc(seed)

		expect(doc.meta.name).toBe('fr-long')
		expect(doc.sections).toHaveLength(1)
		expect(doc.sections[0].name).toBe('intro')
		expect(doc.sections[0].content).toEqual({
			html: '<p>intro</p>',
			json: {type: 'doc'},
		})
		expect(doc.sections[0].subsections).toBeUndefined()
	})

	test('filters empty section groups', () => {
		const seed = {
			schema_version: '0.1',
			seed_type: 'root',
			language: 'en',
			format: 'long',
			sections: [[], []],
		} as unknown as SeedDoc

		const doc = seedDocToDoc(seed)

		expect(doc.sections).toHaveLength(0)
	})
})
