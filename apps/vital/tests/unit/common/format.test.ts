import {describe, test, expect} from 'vitest'
import {
	getSectionKey,
	getSubsectionKey,
	getBlockKey,
	getPresetKey,
	getTagKey,
} from '$lib/common/format'

const SECTION_KEY_OPTIONS = {
	language: 'en',
	format: 'long',
	name: 'new-section',
}
const SECTION_KEY = Object.values(SECTION_KEY_OPTIONS).join(':')

const SUBSECTION_KEY_OPTIONS = {
	language: 'en',
	format: 'long',
	section: SECTION_KEY_OPTIONS.name,
	name: 'new-subsection',
}

const SUBSECTION_KEY = Object.values(SUBSECTION_KEY_OPTIONS).join(':')

const BLOCK_KEY_OPTIONS = {
	language: 'en',
	format: 'long',
	section: SECTION_KEY_OPTIONS.name,
	subsection: SUBSECTION_KEY_OPTIONS.name,
	name: 'new-block',
}

const BLOCK_KEY = Object.values(BLOCK_KEY_OPTIONS).join(':')
const BLOCK_KEY_NO_GROUP = [
	BLOCK_KEY_OPTIONS.language,
	BLOCK_KEY_OPTIONS.format,
	BLOCK_KEY_OPTIONS.section,
	BLOCK_KEY_OPTIONS.name,
].join(':')

const PRESET_KEY_OPTIONS = {
	name: 'new-preset',
}

const TAG_KEY_OPTIONS = {
	group: 'base',
	name: 'new-tag',
}

describe('format.ts - formatting utilities', () => {
	test('getSectionKey', () => {
		const key = getSectionKey(
			SECTION_KEY_OPTIONS.language,
			SECTION_KEY_OPTIONS.format,
			SECTION_KEY_OPTIONS.name,
		)

		expect(key).toBe(SECTION_KEY)
	})

	test('getSubsectionKey', () => {
		const key = getSubsectionKey(
			SUBSECTION_KEY_OPTIONS.language,
			SUBSECTION_KEY_OPTIONS.format,
			SUBSECTION_KEY_OPTIONS.section,
			SUBSECTION_KEY_OPTIONS.name,
		)

		expect(key).toBe(SUBSECTION_KEY)
	})

	test('getBlockKey', () => {
		const key = getBlockKey(
			BLOCK_KEY_OPTIONS.language,
			BLOCK_KEY_OPTIONS.format,
			BLOCK_KEY_OPTIONS.section,
			BLOCK_KEY_OPTIONS.name,
			BLOCK_KEY_OPTIONS.subsection,
		)

		expect(key).toBe(BLOCK_KEY)
	})

	test('getBlockKey - missing subsection', () => {
		const key = getBlockKey(
			BLOCK_KEY_OPTIONS.language,
			BLOCK_KEY_OPTIONS.format,
			BLOCK_KEY_OPTIONS.section,
			BLOCK_KEY_OPTIONS.name,
		)

		expect(key).toBe(BLOCK_KEY_NO_GROUP)
	})

	test('getPresetKey', () => {
		const key = getPresetKey(PRESET_KEY_OPTIONS.name)

		expect(key).toBe(PRESET_KEY_OPTIONS.name)
	})

	test('getTagKey', () => {
		const key = getTagKey(TAG_KEY_OPTIONS.group, TAG_KEY_OPTIONS.name)

		expect(key).toBe(Object.values(TAG_KEY_OPTIONS).join(':'))
	})
})
