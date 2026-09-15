import {describe, test, expect} from 'vitest'
import {
	isRecord,
	isRawSection,
	isRawPreset,
	isRawBase,
	isRawStructure,
	opfsDocTreeToDocStore,
} from '$lib/common/transform/opfs-to-doc'
import {BASE, RAW_BASE, STRUCTURE, RAW_STRUCTURE} from '$tests/fixtures/meta'
import {PRESETS, RAW_PRESETS} from '$tests/fixtures/preset'
import {SEED_DOC, SEED_SECTIONS} from '$tests/fixtures/seed'
import {
	TEST_DOC_EN_LONG,
	OPFS_DOC,
	OPFS_SECTIONS,
	DOC_STORE,
} from '$tests/fixtures/doc'
import type {DocStore} from '$types'

describe('opfs-to-doc.ts - transform OPFSTreeDoc data to Doc object', () => {
	test('isRecord', () => {
		let result = isRecord(SEED_DOC)

		expect(result).toBe(true)

		result = isRecord(TEST_DOC_EN_LONG)

		expect(result).toBe(true)

		result = isRecord(OPFS_SECTIONS[0])

		expect(result).toBe(true)

		result = isRecord(SEED_SECTIONS[0])

		expect(result).toBe(true)

		result = isRecord(RAW_PRESETS[0])

		expect(result).toBe(true)

		result = isRecord(PRESETS[0])

		expect(result).toBe(true)

		result = isRecord([])

		expect(result).toBe(true)

		result = isRecord('')

		expect(result).toBe(false)

		result = isRecord(null)

		expect(result).toBe(false)

		result = isRecord(undefined)

		expect(result).toBe(false)
	})

	test('isRawSection', () => {
		let result = isRawSection(OPFS_SECTIONS[0])

		expect(result).toBe(false)

		result = isRawSection(SEED_SECTIONS[0])

		expect(result).toBe(true)

		result = isRawSection('')

		expect(result).toBe(false)
	})

	test('isRawPreset', () => {
		let result = isRawPreset(PRESETS[0])

		expect(result).toBe(false)

		result = isRawPreset(RAW_PRESETS[0])

		expect(result).toBe(true)

		result = isRawPreset('')

		expect(result).toBe(false)
	})

	test('isRawBase', () => {
		let result = isRawBase(BASE)

		expect(result).toBe(false)

		result = isRawBase(RAW_BASE)

		expect(result).toBe(true)

		result = isRawBase('')

		expect(result).toBe(false)
	})

	test('isRawStructure', () => {
		let result = isRawStructure(STRUCTURE)

		expect(result).toBe(false)

		result = isRawStructure(RAW_STRUCTURE)

		expect(result).toBe(true)

		result = isRawStructure('')

		expect(result).toBe(false)
	})

	// test('rawBaseToBase', () => {
	// 	const result = rawBaseToBase(RAW_BASE)

	// 	expect(result).toStrictEqual(BASE)
	// })

	// test('rawStructureToStructure', () => {
	// 	const result = rawStructureToStructure(RAW_STRUCTURE)

	// 	expect(result).toStrictEqual([STRUCTURE])
	// })

	test('opfsDocTreeToDocStore', () => {
		const result = opfsDocTreeToDocStore(OPFS_DOC)

		const actual: DocStore = {
			...result,
			meta: {
				...result.meta,
				id: undefined,
			},
		}

		if (actual['en'] !== undefined && actual['fr'] !== undefined) {
			if (actual['en']['long'] !== undefined) {
				actual['en']['long'].id = ''

				if (actual['en']['long']['meta'] !== undefined) {
					actual['en']['long']['meta'].id = ''
				}
			}
			if (actual['fr']['long'] !== undefined) {
				actual['fr']['long'].id = ''

				if (actual['fr']['long']['meta'] !== undefined) {
					actual['fr']['long']['meta'].id = ''
				}
			}
		}

		const expected: DocStore = {
			...DOC_STORE,
			meta: {
				...DOC_STORE.meta,
				id: undefined,
			},
		}

		if (expected['en'] !== undefined && expected['fr'] !== undefined) {
			if (expected['en']['long'] !== undefined) {
				expected['en']['long'].id = ''

				if (expected['en']['long']['meta'] !== undefined) {
					expected['en']['long']['meta'].id = ''
				}
			}
			if (expected['fr']['long'] !== undefined) {
				expected['fr']['long'].id = ''

				if (expected['fr']['long']['meta'] !== undefined) {
					expected['fr']['long']['meta'].id = ''
				}
			}
		}

		expect(actual).toStrictEqual(expected)
	})
})
