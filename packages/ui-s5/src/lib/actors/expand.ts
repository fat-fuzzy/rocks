import {ButtonEventType} from '$types'
import {newActor, setupOptions} from './toggle.js'

function actor(toggleId: string, initial: string, name: string) {
	const {states, options} = setupOptions(ButtonEventType.EXPAND)
	return newActor(toggleId, initial, name, states, options)
}

export {actor}
