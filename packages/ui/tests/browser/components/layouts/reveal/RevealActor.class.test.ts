import {describe, it, expect, beforeEach} from 'vitest'
import RevealActor from '$lib/components/layouts/reveal/actor.svelte'
import {EXPAND_PROPS, EXPAND_TOGGLE_PROPS} from '$tests/fixtures/block-props'
// import {REVEAL_PROPS} from '$tests/fixtures/layout-props'

describe(`RevealActor - a class to manage Reveal components`, () => {
	const actor = new RevealActor()

	beforeEach(() => {
		actor.reset()
	})

	describe('init', () => {
		it(`should initialize state args`, () => {
			actor.init({items: EXPAND_PROPS.map((expand) => expand.props)})

			expect(actor.mode).toBe('radio')
			expect(actor.state.get(EXPAND_PROPS[0].props.id)).toMatchObject(
				EXPAND_PROPS[0].props,
			)
			expect(actor.state.get(EXPAND_PROPS[1].props.id)).toMatchObject(
				EXPAND_PROPS[1].props,
			)
		})

		it(`should initialize mode from args`, () => {
			actor.init({mode: 'check', items: []})

			expect(actor.mode).toBe('check')
			expect(actor.state.get(EXPAND_PROPS[0].props.id)).toBe(undefined)
		})
	})

	describe('addRevealItem', () => {
		it(`should add a reveal state entry`, () => {
			actor.addRevealItem(EXPAND_PROPS[0].props.id, EXPAND_PROPS[0].props)

			expect(actor.state.get(EXPAND_PROPS[0].props.id)).toMatchObject(
				EXPAND_PROPS[0].props,
			)
		})
	})

	describe('removeRevealItem', () => {
		it(`should delete a reveal state entry`, () => {
			actor.init({items: EXPAND_PROPS.map((expand) => expand.props)})

			expect(actor.state.get(EXPAND_PROPS[0].props.id)).toMatchObject(
				EXPAND_PROPS[0].props,
			)

			actor.removeRevealItem(EXPAND_PROPS[0].props.id)
			expect(actor.state.get(EXPAND_PROPS[0].props.id)).toBe(undefined)
		})
	})

	describe('getRevealState', () => {
		it(`should return reveal state for a given state id`, () => {
			actor.init({items: EXPAND_PROPS.map((expand) => expand.props)})

			const result1 = actor.getRevealState(EXPAND_PROPS[0].props.id)
			expect(result1).toBe(undefined)

			const result2 = actor.getRevealState(EXPAND_PROPS[1].props.id)
			expect(result2).toEqual(EXPAND_PROPS[1].props.value)
		})
	})
})
