import {createActor} from 'xstate'
import {
	createExpandMachine,
	createSwitchMachine,
	createToggleMachine,
} from '$lib/actors/button-machines.js'

type ActorOptions = {id: string; initial: string}

const expandActor = ({id, initial}: ActorOptions) =>
	createActor(createExpandMachine(`${id}-machine`, initial), {
		id,
	})

const switchActor = ({id, initial}: ActorOptions) =>
	createActor(createSwitchMachine(`${id}-machine`, initial), {
		id,
	})

const toggleActor = ({id, initial}: ActorOptions) =>
	createActor(createToggleMachine(`${id}-machine`, initial), {
		id,
	})

export {expandActor, switchActor, toggleActor}
