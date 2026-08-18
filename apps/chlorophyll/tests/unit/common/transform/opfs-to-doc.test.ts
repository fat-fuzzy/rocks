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
import {TEST_DOC, OPFS_DOC, OPFS_SECTIONS, DOC_STORE} from '$tests/fixtures/doc'

describe('opfs-to-doc.ts - transform OPFSTreeDoc data to Doc object', () => {
	test('isRecord', () => {
		let result = isRecord(SEED_DOC)

		expect(result).toBe(true)

		result = isRecord(TEST_DOC)

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

	test.skip('opfsDocTreeToDocStore', () => {
		const result = opfsDocTreeToDocStore(OPFS_DOC)

		const actual = {
			...result,
			meta: {
				...result.meta,
				id: undefined,
			},
			content: {
				...result.content,
				id: undefined,
			},
		}

		const expected = {
			...DOC_STORE,
			meta: {
				...DOC_STORE.meta,
				id: undefined,
			},
			content: {
				...DOC_STORE.content,
				id: undefined,
			},
		}
		// console.log('result')
		// console.log(result)
		// console.log('actual')
		// console.log(actual)
		// console.log('DOC_STORE')
		// console.log(DOC_STORE)
		// console.log('expected')
		// console.log(expected)

		expect(actual).toStrictEqual(expected)
	})
})
