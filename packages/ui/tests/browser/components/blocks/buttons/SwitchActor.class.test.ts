import type {ButtonEvent, FuzzyPayload} from '$types'
import {describe, it, expect} from 'vitest'
import SwitchActor from '$lib/components/blocks/buttons/Switch/actor.svelte'
import {
	SWITCH_MACHINE,
	SWITCH_TRANSITIONS,
} from '$lib/components/blocks/buttons/Switch/definitions'
import {PROPS_BLOCK} from '$tests/fixtures/style-props'

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
	const actor = new SwitchActor()

	describe('constructor', () => {
		it('should create an instance with  default values', () => {
			expect(actor.state).toEqual('inactive')
			expect(actor.machine).toMatchObject(SWITCH_MACHINE)
			expect(actor.transitions).toMatchObject(SWITCH_TRANSITIONS)
			expect(actor.currentState).toMatchObject(SWITCH_MACHINE.inactive)
			expect(actor.pressed).toEqual(false)
			expect(actor.value).toEqual('inactive')
			expect(actor.id).toEqual('inactive')
			expect(actor.label).toEqual('Inactive')
		})
	})

	describe('init', () => {
		it('should initialize with an empty object', () => {
			actor.init({})

			expect(actor.state).toEqual('inactive')
			expect(actor.machine).toMatchObject(SWITCH_MACHINE)
			expect(actor.transitions).toMatchObject(SWITCH_TRANSITIONS)
			expect(actor.currentState).toMatchObject(SWITCH_MACHINE.inactive)
			expect(actor.pressed).toEqual(false)
			expect(actor.value).toEqual('inactive')
			expect(actor.id).toEqual('inactive')
			expect(actor.label).toEqual('Inactive')
		})

		it('should initialize with a config object', () => {
			const customConfig = {
				...defaultActiveConfig,
				machine: {...SWITCH_MACHINE},
			}
			customConfig.machine.active.value = 'custom-value-active'
			customConfig.machine.inactive.value = 'custom-value-inactive'
			actor.init(customConfig)

			expect(actor.state).toEqual('active')
			expect(actor.machine).toMatchObject(SWITCH_MACHINE)
			expect(actor.transitions).toMatchObject(SWITCH_TRANSITIONS)
			expect(actor.currentState).toMatchObject(SWITCH_MACHINE.active)
			expect(actor.pressed).toEqual(true)
			expect(actor.value).toEqual('custom-value-active')
			expect(actor.id).toEqual('active')
			expect(actor.label).toEqual('Active')
		})
	})

	describe('getTransition', () => {
		it('should transition inactive to active switch event', () => {
			actor.init(defaultInactiveConfig)
			const transition = actor.getTransition('switch')
			expect(transition).toEqual('active')
		})

		it('should transition active to inactive switch event', () => {
			actor.init(defaultActiveConfig)
			const transition = actor.getTransition('switch')
			expect(transition).toEqual('inactive')
		})

		it('should not transition on unknown event ', () => {
			actor.init(defaultInactiveConfig)
			const transition = actor.getTransition('blah' as ButtonEvent)
			expect(transition).toEqual('inactive')
		})
	})

	describe('update', () => {
		it('should transition inactive to active switch event', () => {
			actor.init(defaultInactiveConfig)
			actor.update('switch')
			expect(actor.state).toEqual('active')
		})

		it('should transition inactive to active switch event', () => {
			actor.init(defaultInactiveConfig)
			actor.update('switch')
			expect(actor.state).toEqual('active')
		})

		it('should transition active to inactive switch event', () => {
			actor.init(defaultActiveConfig)
			actor.update('switch')
			expect(actor.state).toEqual('inactive')
		})
	})

	describe('getStyles', () => {
		it('should return correct styles for Switch button from UiBlockProps object', () => {
			actor.init({})
			const styles = actor.getStyles(PROPS_BLOCK[0].props)
			expect(styles).toEqual(`switch size:md ${PROPS_BLOCK[0].expected}`)
		})

		it('should return correct styles for Switch button from empty object', () => {
			actor.init({})
			const styles = actor.getStyles({})
			expect(styles).toEqual('switch')
		})
	})
})
