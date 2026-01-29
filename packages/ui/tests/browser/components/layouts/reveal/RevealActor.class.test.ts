import {describe, it, expect, beforeEach} from 'vitest'
import RevealActor from '$lib/components/layouts/reveal/actor.svelte'
import {EXPAND_PROPS} from '$tests/fixtures/block-props'
// import {REVEAL_PROPS} from '$tests/fixtures/layout-props'

describe(`RevealActor - a class to manage Reveal components`, () => {
	const actor = new RevealActor()

	beforeEach(() => {
		actor.reset()
	})

	describe('init', () => {
		it(`should initialize state and mode from args`, () => {
			actor.init({items: EXPAND_PROPS.map((expand) => expand.props)})

			expect(actor.mode).toBe('radio')
			expect(actor.state.get(EXPAND_PROPS[0].props.id)).toMatchObject(
				EXPAND_PROPS[0].props,
			)
			expect(actor.state.get(EXPAND_PROPS[1].props.id)).toMatchObject(
				EXPAND_PROPS[1].props,
			)
		})
	})
})
