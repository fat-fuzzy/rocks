import type {FuzzyPayload} from '$types'
import {describe, it, expect} from 'vitest'
import ExpandActor from '$lib/components/blocks/buttons/Expand/actor.svelte'
import {
	EXPAND_MACHINE,
	EXPAND_TRANSITIONS,
} from '$lib/components/blocks/buttons/Expand/definitions'
import {PROPS_BLOCK} from '$tests/fixtures/props'

const defaultCollapsedConfig = {
	initial: 'collapsed',
	onclick: (payload: FuzzyPayload) => {
		console.log(JSON.stringify(payload))
	},
	machine: EXPAND_MACHINE,
}

const defaultExpandedConfig = {
	initial: 'expanded',
	onclick: (payload: FuzzyPayload) => {
		console.log(JSON.stringify(payload))
	},
	machine: EXPAND_MACHINE,
}

describe(`ExpandActor - a class to manage Expand button states`, () => {
	describe('constructor', () => {
		it('should initialize with an empty object', () => {
			const actor = new ExpandActor({})

			expect(actor.state).toEqual('collapsed')
			expect(actor.machine).toMatchObject(EXPAND_MACHINE)
			expect(actor.transitions).toMatchObject(EXPAND_TRANSITIONS)
			expect(actor.currentState).toMatchObject(EXPAND_MACHINE.collapsed)
			expect(actor.expanded).toEqual(false)
			expect(actor.value).toEqual('collapsed')
			expect(actor.id).toEqual('collapsed')
			expect(actor.label).toEqual('Expand')
		})

		it('should initialize with a non-empty config object', () => {
			const actor = new ExpandActor(defaultExpandedConfig)

			expect(actor.state).toEqual('expanded')
			expect(actor.machine).toMatchObject(EXPAND_MACHINE)
			expect(actor.transitions).toMatchObject(EXPAND_TRANSITIONS)
			expect(actor.currentState).toMatchObject(EXPAND_MACHINE.expanded)
			expect(actor.expanded).toEqual(true)
			expect(actor.value).toEqual('expanded')
			expect(actor.id).toEqual('expanded')
			expect(actor.label).toEqual('Collapse')
		})
	})

	describe('getTransition', () => {
		it('should transition collapsed to expanded event', () => {
			const actor = new ExpandActor(defaultCollapsedConfig)
			const transition = actor.getTransition('expand')
			expect(transition).toEqual('expanded')
		})

		it('should not transition on collapse event if in collapsed state', () => {
			const actor = new ExpandActor(defaultCollapsedConfig)
			actor.update('collapse')
			expect(actor.state).toEqual('collapsed')
		})

		it('should transition expanded to collapsed event', () => {
			const actor = new ExpandActor(defaultExpandedConfig)
			const transition = actor.getTransition('collapse')
			expect(transition).toEqual('collapsed')
		})

		it('should not transition on expand event if in expanded state', () => {
			const actor = new ExpandActor(defaultExpandedConfig)
			actor.update('expand')
			expect(actor.state).toEqual('expanded')
		})
	})

	describe('update', () => {
		it('should transition collapsed to expanded event', () => {
			const actor = new ExpandActor(defaultCollapsedConfig)
			actor.update('expand')
			expect(actor.state).toEqual('expanded')
		})

		it('should not change state from collapsed on collapse event', () => {
			const actor = new ExpandActor(defaultCollapsedConfig)
			actor.update('collapse')
			expect(actor.state).toEqual('collapsed')
		})

		it('should transition expanded to collapsed event', () => {
			const actor = new ExpandActor(defaultExpandedConfig)
			actor.update('collapse')
			expect(actor.state).toEqual('collapsed')
		})

		it('should not change state from collapsed on collapse event', () => {
			const actor = new ExpandActor(defaultExpandedConfig)
			actor.update('expand')
			expect(actor.state).toEqual('expanded')
		})
	})

	describe('getStyles', () => {
		it('should return correct styles for Expand button from UiBlockProps object', () => {
			const actor = new ExpandActor({})
			const styles = actor.getStyles(PROPS_BLOCK[0].props)
			expect(styles).toEqual(`expand ${PROPS_BLOCK[0].expected}`)
		})

		it('should return correct styles for Expand button from empty object', () => {
			const actor = new ExpandActor({})
			const styles = actor.getStyles({})
			expect(styles).toEqual('expand')
		})
	})
})
