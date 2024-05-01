import {ButtonEvent, newActor, setupOptions} from './toggle.js'

function actor(toggleId: string, initial: string, name: string) {
	const {states, options} = setupOptions(ButtonEvent.SWITCH)
	return newActor(toggleId, initial, name, states, options)
}

export {actor}
