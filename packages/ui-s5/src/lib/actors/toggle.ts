import {setup, createActor, type MachineContext} from 'xstate'
import {UiState, ButtonEventType} from '$types'

function setupOptions(event: ButtonEventType) {
	const states: MachineContext = {
		inactive: {
			on: {[event]: {target: UiState.active}},
		},
		active: {
			on: {[event]: {target: UiState.inactive}},
		},
	}

	const options = {
		types: {
			context: {} as {},
			events: {} as {type: typeof event},
		},
		schemas: {
			events: {
				[event]: {
					type: 'object',
					properties: {},
				},
			},
		},
	}

	return {
		states,
		options,
	}
}

/**
 * Use this function to implement a toggle behaviour, using custom event names
 * This is a helper function that can be used to implement other toggle buttons
 * @param toggleId
 * @param initial
 * @param name
 * @param states
 * @returns
 */
function newActor(
	toggleId: string,
	initial: string,
	name: string,
	states: MachineContext,
	setupOptions: MachineContext,
) {
	const context = {name}
	const machine = setup(setupOptions).createMachine({
		id: toggleId,
		initial: initial,
		context,
		states,
	})

	return createActor(machine, {
		id: toggleId,
	})
}

/**
 * Use this function to implement the Toggle button: it specifically sends TOGGLE events
 * This is the main `actor` function of the `toggle.js` module (see the `switch.ts` and `expand.ts` modules for other `actor` functions)
 * @param toggleId
 * @param initial
 * @param name
 * @param states
 * @returns
 */
function actor(toggleId: string, initial: string, name: string) {
	const {states, options} = setupOptions(ButtonEventType.TOGGLE)
	return newActor(toggleId, initial, name, states, options)
}

export default {newActor, actor, setupOptions}
