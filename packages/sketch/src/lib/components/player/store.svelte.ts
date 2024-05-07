import type {TogglePayload} from '$types'
import {PlayerEvent, PlayerState} from '$types'

class PlayerStore {
	state = $state(PlayerState.idle)
	playState = $state('inactive')
	playSwitch: {[state: string]: PlayerState}

	constructor({
		initial,
		onclick,
	}: {
		initial?: PlayerState
		onclick: (payload: TogglePayload) => void
	}) {
		this.state = initial || PlayerState.idle
		this.playState = initial === PlayerState.playing ? 'active' : 'inactive'
		this.playSwitch = {
			active: {
				value: PlayerEvent.pause,
				text: 'Pause',
				asset: 'emoji:pause',
				variant: 'outline',
				onclick,
			},
			inactive: {
				value: PlayerEvent.play,
				text: 'Play',
				asset: 'emoji:play',
				variant: 'fill',
				onclick,
			},
		}
	}

	public getState(): PlayerState {
		return this.state
	}

	public getPlayState(): PlayerState {
		return this.playState
	}

	public getPlayLabel(): PlayerState {
		return this.playSwitch[this.playState].text
	}

	public setState(state: PlayerState): void {
		this.state = state
	}
}

export default PlayerStore
