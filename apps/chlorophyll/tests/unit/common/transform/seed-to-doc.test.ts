import {describe, test, expect} from 'vitest'
import {seedDocToDoc} from '$lib/common/transform/seed-to-doc'
import {SEED_DOC} from '$tests/fixtures/seed'
import {TEST_DOC_EN_LONG} from '$tests/fixtures/doc'

describe('seed-to-doc.ts - transform SeedDoc data to Doc object', () => {
	test('seedDocToDoc', () => {
		const doc = seedDocToDoc(SEED_DOC)

		expect(doc.id).toBe(doc.meta.id)
		expect(doc.id).toBe(doc.meta.id)
		expect(doc.sections[0].parentId).toBe(doc.id)
		expect(doc.sections[0]?.subsections).toBeDefined()

		// FIXME:
		// const subsections = doc.sections[0]?.subsections || []
		// expect(subsections[0].parent).toBe(doc.sections[0].id)

		const actual = {
			...doc,
			id: undefined,
			meta: {
				...doc.meta,
				id: undefined,
			},
			sections: doc.sections.map((s) => ({
				...s,
				id: undefined,
				name: undefined,
				parentId: undefined,
				subsections: s.subsections?.map((sub) => ({
					...sub,
					id: undefined,
					name: undefined,
					parent: undefined, // FIXME: this data is actually a parentId / check id chain
					blocks: sub.blocks?.map((b) => ({
						...b,
						id: undefined,
						name: undefined,
						parentId: undefined,
					})),
				})),
			})),
		}

		const expected = {
			...TEST_DOC_EN_LONG,
			id: undefined,
			meta: {
				...TEST_DOC_EN_LONG.meta,
				id: undefined,
			},
			sections: TEST_DOC_EN_LONG.sections.map((s) => ({
				...s,
				id: undefined,
				name: undefined,
				parentId: undefined,
				subsections: s.subsections?.map((sub) => ({
					...sub,
					id: undefined,
					name: undefined,
					parent: undefined, // FIXME: this data is actually a parentId / check id chain
					blocks: sub.blocks?.map((b) => ({
						...b,
						id: undefined,
						name: undefined,
						parentId: undefined,
					})),
				})),
			})),
		}

		expect(actual).toStrictEqual(expected)
	})
})
