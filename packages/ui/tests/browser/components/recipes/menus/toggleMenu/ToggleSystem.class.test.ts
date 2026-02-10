import {describe, it, expect, beforeEach} from 'vitest'
import ToggleSystem from '$lib/components/recipes/menus/ToggleMenu/system.svelte'
import {TOGGLE_PROPS, TOGGLE_GROUP_PROPS} from '$tests/fixtures/block-props'

describe(`ToggleSystem - a class to manage ToggleMenu components`, () => {
	const system = new ToggleSystem()

	beforeEach(() => {
		system.reset()
	})

	describe('init', () => {
		it(`should initialize mode from args`, () => {
			system.init({mode: 'check', items: []})

			expect(system.mode).toBe('check')
			expect(system.state.get(TOGGLE_PROPS[0].props.id)).toBe(undefined)
		})

		it(`should initialize state from args`, () => {
			system.init({items: TOGGLE_PROPS.map((toggle) => toggle.props)})

			expect(system.mode).toBe('radio')
			expect(system.state.get(TOGGLE_PROPS[0].props.id)).toMatchObject(
				TOGGLE_PROPS[0].props,
			)
			expect(system.state.get(TOGGLE_PROPS[1].props.id)).toMatchObject(
				TOGGLE_PROPS[1].props,
			)
		})

		it(`should initialize groups from args`, () => {
			system.init({items: TOGGLE_GROUP_PROPS.map((toggle) => toggle.props)})

			expect(system.mode).toBe('radio')

			// Get the group from the first group item
			const groupName = TOGGLE_GROUP_PROPS[0].props.group
			let group
			if (groupName) {
				group = system.groups.get(TOGGLE_GROUP_PROPS[0].props.group)
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
			const result = system.buildGroups(new Map(), TOGGLE_GROUP_PROPS[0].props)

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
			const result = system.buildGroups(new Map(), TOGGLE_GROUP_PROPS[3].props)

			const expected = TOGGLE_GROUP_PROPS[3].expected?.state

			if (expected) {
				expect(result.get('default')).toMatchObject([expected])
			} else {
				expect(false)
			}
		})
	})

	describe('getState', () => {
		it(`should return the currently active toggle items`, () => {
			system.init({items: TOGGLE_PROPS.map((toggle) => toggle.props)})

			const expected = TOGGLE_PROPS[1].expected?.selected

			const result = system.getState()
			if (expected) {
				expect(result).toMatchObject([expected])
			} else {
				expect(false)
			}
		})
	})

	describe('update', () => {
		it(`should set only one active item in radio mode`, () => {
			system.init({
				items: TOGGLE_PROPS.map((toggle) => toggle.props),
			})

			const expected1 = TOGGLE_PROPS[1].expected?.selected

			system.update({
				id: 'toggle-1',
				name: 'toggle-1',
				state: 'active',
				action: () => {},
			})

			const expected0 = TOGGLE_PROPS[0].expected?.selected

			if (expected1 && expected0) {
				const result = system.getState()

				// Only one toggle should be active
				expect(result.length).toBe(1)
				expect(result[0].id).toBe(expected0.id)
			} else {
				expect(false)
			}
		})

		it(`should set all active items in check mode`, () => {
			system.init({
				mode: 'check',
				items: TOGGLE_PROPS.map((toggle) => toggle.props),
			})

			const expected1 = TOGGLE_PROPS[1].expected?.selected

			system.update({
				id: 'toggle-1',
				name: 'toggle-1',
				state: 'active',
				action: () => {},
			})

			const expected0 = TOGGLE_PROPS[0].expected?.selected

			if (expected1 && expected0) {
				const result = system.getState()

				// More than one toggle should be active
				expect(result.length).toBe(2)
				expect(result[0].id).toBe(expected0.id)
				expect(result[1].id).toBe(expected1.id)
			} else {
				expect(false)
			}
		})

		it(`should do nothing if the toggle payload has no action`, () => {
			system.init({
				items: TOGGLE_PROPS.map((toggle) => toggle.props),
			})

			const expected1 = TOGGLE_PROPS[1].expected?.selected
			let result = system.getState()

			if (expected1) {
				expect(result.length).toBe(1)
				expect(result[0].id).toBe(expected1.id)
			}

			system.update({
				id: 'toggle-1',
				name: 'toggle-1',
				state: 'active',
			})

			result = system.getState()

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
