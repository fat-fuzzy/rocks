import {describe, test, expect} from 'vitest'
import {
	sortByNameAsc,
	sortByNameDesc,
	sortByRankAsc,
	sortByRankDesc,
} from '$lib/common/sort'

import {SEED_SECTIONS} from '$tests/fixtures/seed'
import {SECTIONS} from '$tests/fixtures/doc'

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
