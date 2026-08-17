import {describe, test, expect} from 'vitest'
import {
	getTagInputPrefix,
	getTagGroupName,
	checkSelectAll,
	parseGroupFromTargetData,
	applyTags,
} from '$lib/common/tags'

const INPUT_DATA = {
	id: crypto.randomUUID(),
	name: 'input-name',
	group: 'group-name',
}

const TAG_DATA = ['tag-1', 'tag-2']

const TAG_GROUP_DATA = {
	name: 'tag-group-1',
	title: 'Tag Group 1',
	type: 'checkbox',
	items: TAG_DATA,
}

const TAG_GROUP_DATA_3 = {
	name: 'tag-group-3',
	title: 'Tag Group 3',
	type: 'checkbox',
	items: [],
}

const TAG_GROUP_RADIO_DATA = {
	name: 'tag-group-radio',
	title: 'Tag Group Radio',
	type: 'radio',
	items: ['radio-1', 'radio-2'],
}

describe('tags.ts - tag management utilities', () => {
	test('getTagInputPrefix', () => {
		let prefixed = getTagInputPrefix('save', INPUT_DATA.id)

		expect(prefixed).toBe(`save-${INPUT_DATA.id}`)

		prefixed = getTagInputPrefix('delete')

		expect(prefixed).toBe('delete')
	})

	test('getTagGroupName', () => {
		let groupName = getTagGroupName('save', INPUT_DATA.name, INPUT_DATA.id)

		expect(groupName).toBe(`save-${INPUT_DATA.id}-${INPUT_DATA.name}`)

		groupName = getTagGroupName('delete', INPUT_DATA.name)

		expect(groupName).toBe(`delete-${INPUT_DATA.name}`)
	})

	test('checkSelectAll', () => {
		let selectAll = checkSelectAll('save', 'checkbox', 'all-save-sections')

		expect(selectAll).toBe(true)

		selectAll = checkSelectAll('update', 'checkbox', 'all-update-sections')

		expect(selectAll).toBe(true)

		selectAll = checkSelectAll('save', 'radio', 'all-save-sections')

		expect(selectAll).toBe(false)

		selectAll = checkSelectAll('delete', 'checkbox', 'delete-sections')

		expect(selectAll).toBe(false)

		selectAll = checkSelectAll('delete', 'checkbox', 'all-save-sections')

		expect(selectAll).toBe(false)
	})

	test('parseGroupFromTargetData', () => {
		let group = parseGroupFromTargetData(
			'save',
			`save-${INPUT_DATA.name}`, // name or value
			'checkbox',
			false,
		)
		expect(group).toBe(INPUT_DATA.name)

		group = parseGroupFromTargetData(
			'save',
			`save-${INPUT_DATA.id}-${INPUT_DATA.name}`, // name or value
			'radio',
			false,
			INPUT_DATA.id,
		)

		expect(group).toBe(INPUT_DATA.name)

		group = parseGroupFromTargetData(
			'save',
			`all-save-${INPUT_DATA.name}`, // name or value
			'checkbox',
			true,
		)

		expect(group).toBe(INPUT_DATA.name)

		group = parseGroupFromTargetData(
			'save',
			`save-${INPUT_DATA.name}`, // name or value
			'radio',
			true, // isSelectAll should not have any effect for type radio
		)

		expect(group).toBe(INPUT_DATA.name)

		// The prefix `all-` will corrupt output if the input is not flagged as isSelectAll=true
		group = parseGroupFromTargetData(
			'save',
			`all-save-${INPUT_DATA.name}`, // name or value
			'checkbox',
			false,
		)

		expect(group).not.toBe(INPUT_DATA.name)
	})

	test('applyTags', () => {
		// Test: add tag
		let tags = applyTags({
			cta: 'save',
			value: 'tag-1',
			name: 'save-tag-group-1',
			type: 'checkbox',
			currentTags: ['tag-2'],
			tagGroups: [TAG_GROUP_DATA],
		})

		expect(tags).toStrictEqual([TAG_DATA[1], TAG_DATA[0]])

		// Test: remove tag
		tags = applyTags({
			cta: 'save',
			value: 'tag-1',
			name: 'save-tag-group-1',
			type: 'checkbox',
			currentTags: ['tag-1', 'tag-2'],
			tagGroups: [TAG_GROUP_DATA],
		})

		expect(tags).toStrictEqual(['tag-2'])

		// Test: change radio tags

		tags = applyTags({
			cta: 'save',
			name: 'save-tag-group-radio',
			value: 'radio-1',
			type: 'radio',
			currentTags: ['radio-2'],
			tagGroups: [TAG_GROUP_DATA, TAG_GROUP_RADIO_DATA],
		})

		expect(tags).toStrictEqual(['radio-1'])

		// Test: remove tag 'untagged` when adding tag
		tags = applyTags({
			cta: 'save',
			value: 'tag-1',
			name: 'save-tag-group-1',
			type: 'checkbox',
			currentTags: ['untagged'],
			tagGroups: [TAG_GROUP_DATA],
		})

		expect(tags).toStrictEqual(['tag-1'])

		// Test: keep tag from another group
		tags = applyTags({
			cta: 'save',
			value: 'tag-1',
			name: 'save-tag-group-1',
			type: 'checkbox',
			currentTags: ['tag-1-group-2'],
			tagGroups: [TAG_GROUP_DATA],
		})

		expect(tags).toStrictEqual(['tag-1-group-2', 'tag-1'])

		// Test: add all tags from group (select all)
		tags = applyTags({
			cta: 'save',
			value: 'all-save-tag-group-1',
			name: 'all-save-tag-group-1',
			type: 'checkbox',
			currentTags: [],
			tagGroups: [TAG_GROUP_DATA],
		})

		expect(tags).toStrictEqual(TAG_DATA)

		// Test: add all tags from group (select all): some tags are already applied
		tags = applyTags({
			cta: 'save',
			value: 'all-save-tag-group-1',
			name: 'all-save-tag-group-1',
			type: 'checkbox',
			currentTags: ['tag-1'],
			tagGroups: [TAG_GROUP_DATA],
		})

		expect(tags).toStrictEqual(TAG_DATA)

		// Test: add 'untagged' tag if all tags are removed
		tags = applyTags({
			cta: 'delete',
			value: 'all-delete-tag-group-1',
			name: 'all-delete-tag-group-1',
			type: 'checkbox',
			currentTags: TAG_DATA,
			tagGroups: [TAG_GROUP_DATA],
		})

		expect(tags).toStrictEqual(['untagged'])

		// Test: throws error if name not provided
		try {
			tags = applyTags({
				cta: 'save',
				value: 'save-tag-group-1',
				type: 'checkbox',
				currentTags: TAG_DATA,
				tagGroups: [TAG_GROUP_DATA],
			})
		} catch (error) {
			expect((error as Error).message).toStrictEqual(
				'Input group selection is missing group name',
			)
		}

		// Test: throws error if group not found
		try {
			tags = applyTags({
				cta: 'save',
				name: 'save-tag-group-2',
				value: 'save-tag-group-2',
				type: 'checkbox',
				currentTags: TAG_DATA,
				tagGroups: [TAG_GROUP_DATA],
			})
		} catch (error) {
			expect((error as Error).message).toStrictEqual(
				'Cannot find tag group tag-group-2',
			)
		}

		// Test: throws error if group has no tags
		try {
			tags = applyTags({
				cta: 'save',
				name: 'save-tag-group-3',
				value: 'save-tag-group-3',
				type: 'checkbox',
				currentTags: TAG_DATA,
				tagGroups: [TAG_GROUP_DATA, TAG_GROUP_DATA_3],
			})
		} catch (error) {
			expect((error as Error).message).toStrictEqual(
				'Tag group tag-group-3 is empty',
			)
		}
	})
})
