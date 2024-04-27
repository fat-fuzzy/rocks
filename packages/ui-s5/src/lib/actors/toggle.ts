import {createMachine} from 'xstate'

const BUTTON_STATES ={
	inactive: {
		on: {TOGGLE: 'active'},
	},
	active: {
		on: {TOGGLE: 'inactive'},
	},
}

function newMachine(machineId: string, initial: string) {
	return createMachine({states: BUTTON_STATES, id: machineId, initial: initial})
}

export default {newMachine}
