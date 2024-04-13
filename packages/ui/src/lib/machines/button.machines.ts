import {createMachine} from 'xstate'

const BUTTON_STATES = {
	toggle: {
		inactive: {
			on: {TOGGLE: 'active'},
		},
		active: {
			on: {TOGGLE: 'inactive'},
		},
	},
	switch: {
		inactive: {
			on: {SWITCH: 'active'},
		},
		active: {
			on: {SWITCH: 'inactive'},
		},
	},
	expand: {
		inactive: {
			on: {EXPAND: 'active'},
		},
		active: {
			on: {EXPAND: 'inactive'},
		},
	},
}

function createButtonMachine(machineId: string, initial: string, states: any) {
	return createMachine({states, id: machineId, initial: initial})
}

function createToggleMachine(machineId: string, initial: string) {
	const states = BUTTON_STATES['toggle']
	return createButtonMachine(machineId, initial, states)
}

function createSwitchMachine(machineId: string, initial: string) {
	const states = BUTTON_STATES['switch']
	return createButtonMachine(machineId, initial, states)
}

function createExpandMachine(machineId: string, initial: string) {
	const states = BUTTON_STATES['expand']
	return createButtonMachine(machineId, initial, states)
}

export default {
	createSwitch: createSwitchMachine,
	createToggle: createToggleMachine,
	createExpand: createExpandMachine,
}
