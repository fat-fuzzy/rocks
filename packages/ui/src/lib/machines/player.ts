import {createMachine} from 'xstate'

const PLAYER_STATES ={
	pause: {
		on: {PLAY: 'play'},
	},
	play: {
		on: {PAUSE: 'pause', CLEAR: 'pause'},
	},
	clear: {
	},
}

function createPlayerMachine(machineId: string, initial: string) {
	return createMachine({states: PLAYER_STATES, id: machineId, initial: initial})
}

export default createPlayerMachine
