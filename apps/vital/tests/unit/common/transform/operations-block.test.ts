import type {Block, Section} from '#types'

import {describe, expect, test} from 'vitest'

import {
	deleteBlockInSection,
	getSectionsByRank,
	updateBlockInSection,
	updateSectionRanks,
} from '#lib/common/transform/operations-block.js'

const block: Block = {
	content_type: 'block',
	id: 'block-1',
	name: 'intro',
	rank: 1,
	group: 'overview',
	content: {html: '<p>Intro</p>', json: {}},
	tags: ['design'],
	parentId: 'section-1',
} as const

const section: Section = {
	content_type: 'section',
	id: 'section-1',
	name: 'overview',
	title: 'Overview',
	rank: 1,
	parentId: 'doc-root',
	tags: ['featured'],
	content: {html: '<p>Main intro</p>', json: {}},
	subsections: [
		{
			name: 'overview',
			parent: 'overview',
			rank: 1,
			blocks: [block],
		},
	],
} as const

describe('operations-block.ts - block and section mutation helpers', () => {
	test('updateBlockInSection updates a block within a matching subsection', () => {
		const updatedSection = updateBlockInSection({
			language: 'en',
			format: 'long',
			block: {
				...block,
				content: {
					html: '<p>Updated</p>',
					json: {done: true},
				},
			},
			section,
		})

		expect(updatedSection).toBeDefined()
		expect(updatedSection?.subsections?.[0].blocks[0].content).toMatchObject({
			html: '<p>Updated</p>',
			json: {done: true},
		})
	})

	describe('deleteBlockInSection', () => {
		test('removes section content when no groups exist, and removes a named block otherwise', () => {
			const defaultSection = {
				...section,
				content: {html: '<p>Default</p>', json: {}},
				subsections: undefined,
			}

			const sectionWithGroup = {
				...section,
				subsections: [
					{
						name: 'group-a',
						parent: 'overview',
						rank: 1,
						blocks: [{...block, name: 'alpha'}],
					},
				],
			}

			const resultDefault = deleteBlockInSection({
				name: 'main-block',
				content_type: 'block',
				parent: 'overview',
				section: defaultSection,
			})

			expect(resultDefault).toBeDefined()
			expect(resultDefault?.content).toBeUndefined()

			const resultGroup = deleteBlockInSection({
				name: 'alpha',
				content_type: 'block',
				group: 'group-a',
				parent: 'overview',
				section: sectionWithGroup,
			})

			expect(resultGroup?.subsections?.[0].blocks).toEqual([])
			expect(() =>
				deleteBlockInSection({
					name: 'missing',
					content_type: 'block',
					group: 'missing-group',
					parent: 'overview',
					section: {
						...section,
						subsections: [
							{
								name: 'other-group',
								parent: 'overview',
								rank: 1,
								blocks: [block],
							},
						],
					},
				}),
			).toThrow(/Group .* not found/)
		})

		test('treats the section default as a special-case and throws for missing named groups', () => {
			const bareSection = {
				...section,
				content: {html: '<p>Default</p>', json: {}},
				subsections: undefined,
			}

			const defaultResult = deleteBlockInSection({
				name: 'main-block',
				content_type: 'block',
				parent: 'overview',
				section: bareSection,
			})

			expect(defaultResult).toMatchObject({
				name: 'overview',
			})
			expect(defaultResult).not.toHaveProperty('content')

			expect(() =>
				deleteBlockInSection({
					name: 'missing',
					content_type: 'block',
					group: 'ghost-group',
					parent: 'overview',
					section: bareSection,
				}),
			).toThrow(/No groups found/)
		})
	})

	test('updateSectionRanks and getSectionsByRank return the sections matching the target rank', () => {
		const sections = [
			{...section, id: 'section-1', name: 'intro', rank: 1},
			{...section, id: 'section-2', name: 'summary', rank: 2},
			{...section, id: 'section-3', name: 'details', rank: 3},
		]
		const docIndex = {
			sections: {
				intro: sections[0],
				summary: sections[1],
				details: sections[2],
			},
			sectionsById: {},
			subsections: {},
			blocks: {},
		}

		const updated = updateSectionRanks({rank: 2, docIndex})
		expect(updated).toHaveLength(1)
		expect(getSectionsByRank({rank: 2, docIndex: docIndex})).toHaveLength(1)
	})
})
