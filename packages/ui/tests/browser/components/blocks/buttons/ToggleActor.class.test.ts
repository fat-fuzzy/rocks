import type {ButtonEvent, FuzzyPayload} from '$types'
import {describe, it, expect} from 'vitest'
import ToggleActor from '$lib/components/blocks/buttons/Toggle/actor.svelte'
import {
	TOGGLE_MACHINE,
	TOGGLE_TRANSITIONS,
} from '$lib/components/blocks/buttons/Toggle/definitions'
import {PROPS_BLOCK} from '$tests/fixtures/style-props'

const defaultActiveConfig = {
	initial: 'active',
	onclick: (payload: FuzzyPayload) => {
		console.log(JSON.stringify(payload))
	},
	machine: TOGGLE_MACHINE,
}

const defaultInactiveConfig = {
	initial: 'inactive',
	onclick: (payload: FuzzyPayload) => {
		console.log(JSON.stringify(payload))
	},
	machine: TOGGLE_MACHINE,
}

describe(`ToggleActor - a class to manage Toggle button states`, () => {
	const actor = new ToggleActor()

	describe('constructor', () => {
		it('should create an instance with  default values', () => {
			expect(actor.state).toEqual('inactive')
			expect(actor.machine).toMatchObject(TOGGLE_MACHINE)
			expect(actor.transitions).toMatchObject(TOGGLE_TRANSITIONS)
			expect(actor.currentState).toMatchObject(TOGGLE_MACHINE.inactive)
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
			expect(actor.machine).toMatchObject(TOGGLE_MACHINE)
			expect(actor.transitions).toMatchObject(TOGGLE_TRANSITIONS)
			expect(actor.currentState).toMatchObject(TOGGLE_MACHINE.inactive)
			expect(actor.pressed).toEqual(false)
			expect(actor.value).toEqual('inactive')
			expect(actor.id).toEqual('inactive')
			expect(actor.label).toEqual('Inactive')
		})

		it('should initialize with a config object', () => {
			const customConfig = {
				...defaultActiveConfig,
				machine: {...TOGGLE_MACHINE},
			}
			customConfig.machine.active.value = 'custom-value-active'
			customConfig.machine.inactive.value = 'custom-value-inactive'
			actor.init(customConfig)

			expect(actor.state).toEqual('active')
			expect(actor.machine).toMatchObject(TOGGLE_MACHINE)
			expect(actor.transitions).toMatchObject(TOGGLE_TRANSITIONS)
			expect(actor.currentState).toMatchObject(TOGGLE_MACHINE.active)
			expect(actor.pressed).toEqual(true)
			expect(actor.value).toEqual('custom-value-active')
			expect(actor.id).toEqual('active')
			expect(actor.label).toEqual('Active')
		})
	})

	describe('getTransition', () => {
		it('should transition inactive to active toggle event', () => {
			actor.init(defaultInactiveConfig)
			const transition = actor.getTransition('toggle')
			expect(transition).toEqual('active')
		})

		it('should transition active to inactive toggle event', () => {
			actor.init(defaultActiveConfig)
			const transition = actor.getTransition('toggle')
			expect(transition).toEqual('inactive')
		})

		it('should not transition on unknown event ', () => {
			actor.init(defaultInactiveConfig)
			const transition = actor.getTransition('blah' as ButtonEvent)
			expect(transition).toEqual('inactive')
		})
	})

	describe('update', () => {
		it('should transition inactive to active toggle event', () => {
			actor.init(defaultInactiveConfig)
			actor.update('toggle')
			expect(actor.state).toEqual('active')
		})

		it('should transition active to inactive toggle event', () => {
			actor.init(defaultActiveConfig)
			actor.update('toggle')
			expect(actor.state).toEqual('inactive')
		})
	})

	describe('getStyles', () => {
		it('should return correct styles for Toggle button from UiBlockProps object', () => {
			const styles = actor.getStyles(PROPS_BLOCK[0].props)
			expect(styles).toEqual(`toggle size:md ${PROPS_BLOCK[0].expected}`)
		})

		it('should return correct styles for Toggle button from empty object', () => {
			const styles = actor.getStyles({})
			expect(styles).toEqual('toggle')
		})
	})
})
