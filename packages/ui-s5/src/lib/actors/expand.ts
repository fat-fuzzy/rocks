import {ButtonEventType} from '$types'
import toggleActor from './toggle.js'

function actor(toggleId: string, initial: string, name: string) {
	const {states, options} = toggleActor.setupOptions(ButtonEventType.EXPAND)
	return toggleActor.newActor(toggleId, initial, name, states, options)
}

export {actor}
