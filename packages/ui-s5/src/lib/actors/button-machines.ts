import {createMachine, type MachineContext} from 'xstate'

enum ButtonStates {
	active = 'active',
	inactive = 'inactive',
}

type ButtonContext = {
	id: string // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value. TODO : clean this
	name: string
	value: string
	pressed?: boolean
	expanded?: boolean
}

const DEFAULT_BUTTON_CONTEXT: ButtonContext = {id: '', name: '', value: '', pressed: false}
const BUTTON_STATES: MachineContext = {
	toggle: {
		inactive: {
			on: {TOGGLE: {target: ButtonStates.active}},
		},
		active: {
			on: {TOGGLE: {target: ButtonStates.inactive}},
		},
	},
	switch: {
		inactive: {
			on: {SWITCH: {target: ButtonStates.active}},
		},
		active: {
			on: {SWITCH: {target: ButtonStates.inactive}},
		},
	},
	expand: {
		inactive: {
			on: {EXPAND: {target: ButtonStates.active}},
		},
		active: {
			on: {EXPAND: {target: ButtonStates.inactive}},
		},
	},
}

function createButtonMachine(
	machineId: string,
	initial: string,
	states: MachineContext,
	context: ButtonContext,
) {
	return createMachine({
		states,
		id: machineId,
		initial: initial,
		context,
	})
}

function createToggleMachine(machineId: string, initial: string) {
	const states = BUTTON_STATES['toggle']
	const context = DEFAULT_BUTTON_CONTEXT
	return createButtonMachine(machineId, initial, states, context)
}

function createSwitchMachine(machineId: string, initial: string) {
	const states = BUTTON_STATES['switch']
	const context = DEFAULT_BUTTON_CONTEXT
	return createButtonMachine(machineId, initial, states, context)
}

function createExpandMachine(machineId: string, initial: string) {
	const states = BUTTON_STATES['expand']
	const context = {...DEFAULT_BUTTON_CONTEXT, expanded: false}
	return createButtonMachine(machineId, initial, states, context)
}

export {createSwitchMachine, createToggleMachine, createExpandMachine}
