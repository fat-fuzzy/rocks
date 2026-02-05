import {describe, it, expect, beforeEach} from 'vitest'
import ToggleMenuActor from '$lib/components/recipes/menus/ToggleMenu/actor.svelte'
import {TOGGLE_PROPS, TOGGLE_GROUP_PROPS} from '$tests/fixtures/block-props'

describe(`ToggleMenuActor - a class to manage ToggleMenu components`, () => {
	const actor = new ToggleMenuActor()

	beforeEach(() => {
		actor.reset()
	})

	describe('init', () => {
		it(`should initialize mode from args`, () => {
			actor.init({mode: 'check', items: []})

			expect(actor.mode).toBe('check')
			expect(actor.state.get(TOGGLE_PROPS[0].props.id)).toBe(undefined)
		})

		it(`should initialize state from args`, () => {
			actor.init({items: TOGGLE_PROPS.map((toggle) => toggle.props)})

			expect(actor.mode).toBe('radio')
			expect(actor.state.get(TOGGLE_PROPS[0].props.id)).toMatchObject(
				TOGGLE_PROPS[0].props,
			)
			expect(actor.state.get(TOGGLE_PROPS[1].props.id)).toMatchObject(
				TOGGLE_PROPS[1].props,
			)
		})

		it(`should initialize groups from args`, () => {
			actor.init({items: TOGGLE_GROUP_PROPS.map((toggle) => toggle.props)})

			expect(actor.mode).toBe('radio')

			// Get the group from the first group item
			const groupName = TOGGLE_GROUP_PROPS[0].props.group
			let group
			if (groupName) {
				group = actor.groups.get(TOGGLE_GROUP_PROPS[0].props.group)
			}

			// Test against the group from the second group item
			const expected = TOGGLE_GROUP_PROPS[1].expected?.state

			if (expected) {
				const result = group?.get(TOGGLE_GROUP_PROPS[1].props.id)
				// -> they should belong to the same group
				expect(result).toMatchObject(expected)
			} else {
				expect(false)
			}
		})
	})

	describe('buildGroups', () => {
		it(`should put toggle props into a group `, () => {
			const result = actor.buildGroups(new Map(), TOGGLE_GROUP_PROPS[0].props)

			const group = TOGGLE_GROUP_PROPS[0].props.group

			const expected = TOGGLE_GROUP_PROPS[0].expected?.state

			if (expected && group) {
				// -> they should belong to the same group
				expect(result.get(group)).toMatchObject([expected])
			} else {
				expect(false)
			}
		})

		it(`should create a default group for items with unidentified group`, () => {
			const result = actor.buildGroups(new Map(), TOGGLE_GROUP_PROPS[3].props)

			const expected = TOGGLE_GROUP_PROPS[3].expected?.state

			if (expected) {
				expect(result.get('default')).toMatchObject([expected])
			} else {
				expect(false)
			}
		})
	})

	describe('getSelected', () => {
		it(`should return the currently active toggle items`, () => {
			actor.init({items: TOGGLE_PROPS.map((toggle) => toggle.props)})

			const expected = TOGGLE_PROPS[1].expected?.selected

			const result = actor.getSelected()
			if (expected) {
				expect(result).toMatchObject([expected])
			} else {
				expect(false)
			}
		})
	})

	describe('update', () => {
		it(`should set only one active item in radio mode`, () => {
			actor.init({
				items: TOGGLE_PROPS.map((toggle) => toggle.props),
			})

			const expected1 = TOGGLE_PROPS[1].expected?.selected

			actor.update({
				id: 'toggle-1',
				name: 'toggle-1',
				state: 'active',
				action: () => {},
			})

			const expected0 = TOGGLE_PROPS[0].expected?.selected

			if (expected1 && expected0) {
				const result = actor.getSelected()

				// Only one toggle should be active
				expect(result.length).toBe(1)
				expect(result[0].id).toBe(expected0.id)
			} else {
				expect(false)
			}
		})

		it(`should set all active items in check mode`, () => {
			actor.init({
				mode: 'check',
				items: TOGGLE_PROPS.map((toggle) => toggle.props),
			})

			const expected1 = TOGGLE_PROPS[1].expected?.selected

			actor.update({
				id: 'toggle-1',
				name: 'toggle-1',
				state: 'active',
				action: () => {},
			})

			const expected0 = TOGGLE_PROPS[0].expected?.selected

			if (expected1 && expected0) {
				const result = actor.getSelected()

				// More than one toggle should be active
				expect(result.length).toBe(2)
				expect(result[0].id).toBe(expected0.id)
				expect(result[1].id).toBe(expected1.id)
			} else {
				expect(false)
			}
		})

		it(`should do nothing if the toggle payload has no action`, () => {
			actor.init({
				items: TOGGLE_PROPS.map((toggle) => toggle.props),
			})

			const expected1 = TOGGLE_PROPS[1].expected?.selected
			let result = actor.getSelected()

			if (expected1) {
				expect(result.length).toBe(1)
				expect(result[0].id).toBe(expected1.id)
			}

			actor.update({
				id: 'toggle-1',
				name: 'toggle-1',
				state: 'active',
			})

			result = actor.getSelected()

			if (expected1) {
				// More than one toggle should be active
				expect(result.length).toBe(1)
				expect(result[0].id).toBe(expected1.id)
			} else {
				expect(false)
			}
		})
	})
})
