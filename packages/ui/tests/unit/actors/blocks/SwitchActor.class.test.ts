import type {FuzzyPayload} from '$types'
import {describe, it, expect} from 'vitest'
import SwitchActor from '$lib/components/blocks/buttons/Switch/actor.svelte'
import {
	SWITCH_MACHINE,
	SWITCH_TRANSITIONS,
} from '$lib/components/blocks/buttons/Switch/definitions'
import {PROPS_BLOCK} from '$tests/fixtures/props'

const defaultActiveConfig = {
	initial: 'active',
	onclick: (payload: FuzzyPayload) => {
		console.log(JSON.stringify(payload))
	},
	machine: SWITCH_MACHINE,
}

const defaultInactiveConfig = {
	initial: 'inactive',
	onclick: (payload: FuzzyPayload) => {
		console.log(JSON.stringify(payload))
	},
	machine: SWITCH_MACHINE,
}

describe(`SwitchActor - a class to manage Switch button states`, () => {
	describe('constructor', () => {
		it('should initialize with an empty object', () => {
			const actor = new SwitchActor({})

			expect(actor.state).toEqual('inactive')
			expect(actor.machine).toMatchObject(SWITCH_MACHINE)
			expect(actor.transitions).toMatchObject(SWITCH_TRANSITIONS)
			expect(actor.currentState).toMatchObject(SWITCH_MACHINE.inactive)
			expect(actor.pressed).toEqual(false)
			expect(actor.value).toEqual('inactive')
			expect(actor.id).toEqual('inactive')
			expect(actor.label).toEqual('Inactive')
		})

		it('should initialize with a non-empty config object', () => {
			const actor = new SwitchActor(defaultActiveConfig)

			expect(actor.state).toEqual('active')
			expect(actor.machine).toMatchObject(SWITCH_MACHINE)
			expect(actor.transitions).toMatchObject(SWITCH_TRANSITIONS)
			expect(actor.currentState).toMatchObject(SWITCH_MACHINE.active)
			expect(actor.pressed).toEqual(true)
			expect(actor.value).toEqual('active')
			expect(actor.id).toEqual('active')
			expect(actor.label).toEqual('Active')
		})
	})

	describe('getTransition', () => {
		it('should transition inactive to active switch event', () => {
			const actor = new SwitchActor(defaultInactiveConfig)
			const transition = actor.getTransition('switch')
			expect(transition).toEqual('active')
		})

		it('should transition active to inactive switch event', () => {
			const actor = new SwitchActor(defaultActiveConfig)
			const transition = actor.getTransition('switch')
			expect(transition).toEqual('inactive')
		})
	})

	describe('update', () => {
		it('should transition inactive to active switch event', () => {
			const actor = new SwitchActor(defaultInactiveConfig)
			actor.update('switch')
			expect(actor.state).toEqual('active')
		})

		it('should transition inactive to active switch event', () => {
			const actor = new SwitchActor(defaultInactiveConfig)
			actor.update('switch')
			expect(actor.state).toEqual('active')
		})

		it('should transition active to inactive switch event', () => {
			const actor = new SwitchActor(defaultActiveConfig)
			actor.update('switch')
			expect(actor.state).toEqual('inactive')
		})
	})

	describe('getStyles', () => {
		it('should return correct styles for Switch button from UiBlockProps object', () => {
			const actor = new SwitchActor({})
			const styles = actor.getStyles(PROPS_BLOCK[0].props)
			expect(styles).toEqual(`switch size:md ${PROPS_BLOCK[0].expected}`)
		})

		it('should return correct styles for Switch button from empty object', () => {
			const actor = new SwitchActor({})
			const styles = actor.getStyles({})
			expect(styles).toEqual('switch')
		})
	})
})
