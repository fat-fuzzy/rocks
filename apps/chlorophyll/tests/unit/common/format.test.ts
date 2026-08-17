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

const SUBSECTION_KEY_OPTIONS = {
	language: 'en',
	format: 'long',
	section: SECTION_KEY_OPTIONS.name,
	name: 'new-subsection',
}

const BLOCK_KEY_OPTIONS = {
	language: 'en',
	format: 'long',
	section: SECTION_KEY_OPTIONS.name,
	subsection: SUBSECTION_KEY_OPTIONS.name,
	name: 'new-block',
}

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

		expect(key).toBe(Object.values(SECTION_KEY_OPTIONS).join(':'))
	})

	test('getSubsectionKey', () => {
		const key = getSubsectionKey(
			SUBSECTION_KEY_OPTIONS.language,
			SUBSECTION_KEY_OPTIONS.format,
			SUBSECTION_KEY_OPTIONS.section,
			SUBSECTION_KEY_OPTIONS.name,
		)

		expect(key).toBe(Object.values(SUBSECTION_KEY_OPTIONS).join(':'))
	})

	test('getBlockKey', () => {
		const key = getBlockKey(
			BLOCK_KEY_OPTIONS.language,
			BLOCK_KEY_OPTIONS.format,
			BLOCK_KEY_OPTIONS.section,
			BLOCK_KEY_OPTIONS.name,
			BLOCK_KEY_OPTIONS.subsection,
		)

		expect(key).toBe(Object.values(BLOCK_KEY_OPTIONS).join(':'))
	})

	test('getBlockKey- missing subsection', () => {
		const key = getBlockKey(
			BLOCK_KEY_OPTIONS.language,
			BLOCK_KEY_OPTIONS.format,
			BLOCK_KEY_OPTIONS.section,
			BLOCK_KEY_OPTIONS.name,
		)

		expect(key).toBe(
			Object.values([
				BLOCK_KEY_OPTIONS.language,
				BLOCK_KEY_OPTIONS.format,
				BLOCK_KEY_OPTIONS.section,
				BLOCK_KEY_OPTIONS.name,
			]).join(':'),
		)
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
