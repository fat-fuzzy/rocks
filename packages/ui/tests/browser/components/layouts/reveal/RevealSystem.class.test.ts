import {describe, it, expect, beforeEach} from 'vitest'
import system from '$lib/components/layouts/reveal/system.svelte'
import {EXPAND_PROPS} from '$tests/fixtures/block-props'
// import {REVEAL_PROPS} from '$tests/fixtures/layout-props'

describe(`RevealSystem - a class to manage Reveal components`, () => {
	beforeEach(() => {
		system.reset()
	})

	describe('init', () => {
		it(`should initialize state and mode from args`, () => {
			system.init({items: EXPAND_PROPS.map((expand) => expand.props)})

			expect(system.mode).toBe('radio')
			expect(system.state.get(EXPAND_PROPS[0].props.id)).toMatchObject(
				EXPAND_PROPS[0].props,
			)
			expect(system.state.get(EXPAND_PROPS[1].props.id)).toMatchObject(
				EXPAND_PROPS[1].props,
			)
		})

		it(`should initialize mode from args`, () => {
			system.init({mode: 'check', items: []})

			expect(system.mode).toBe('check')
			expect(system.state.get(EXPAND_PROPS[0].props.id)).toBe(undefined)
		})
	})

	describe('setStateItem', () => {
		it(`should add a reveal state entry`, () => {
			system.setStateItem(EXPAND_PROPS[0].props)

			expect(system.state.get(EXPAND_PROPS[0].props.id)).toMatchObject(
				EXPAND_PROPS[0].props,
			)
		})
	})

	describe('removeRevealItem', () => {
		it(`should delete a reveal state entry`, () => {
			system.init({items: EXPAND_PROPS.map((expand) => expand.props)})

			expect(system.state.get(EXPAND_PROPS[0].props.id)).toMatchObject(
				EXPAND_PROPS[0].props,
			)

			system.deleteStateItem(EXPAND_PROPS[0].props.id)
			expect(system.state.get(EXPAND_PROPS[0].props.id)).toBe(undefined)
		})
	})

	describe('getState', () => {
		it(`should return reveal state for a given state id`, () => {
			system.init({items: EXPAND_PROPS.map((expand) => expand.props)})

			const result1 = system.getState(EXPAND_PROPS[0].props.id)
			expect(result1).toBe('collapsed')

			const result2 = system.getState(EXPAND_PROPS[1].props.id)
			expect(result2).toEqual(EXPAND_PROPS[1].props.state)
		})
	})
})
