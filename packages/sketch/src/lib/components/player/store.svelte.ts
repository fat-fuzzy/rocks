import type {TogglePayload} from '$types'
import {PlayerEvent, PlayerState} from '$types'
import {sketchTransitions} from '../sketch/store.svelte'

class PlayerStore {
	state = $state(PlayerState.idle)
	playState = $state(this.state === PlayerState.playing ? 'active' : 'inactive')
	playSwitch: {[state: string]: PlayerState} = $state({
			active: {
				value: PlayerEvent.pause,
				text: 'Pause',
				asset: 'emoji:pause',
				variant: 'outline',
        onclick: function(payload: TogglePayload){
          return payload
        }
			},
			inactive: {
				value: PlayerEvent.play,
				text: 'Play',
				asset: 'emoji:play',
				variant: 'fill',
        onclick: function(payload: TogglePayload){
          return payload
        }
			},
	})

	constructor({
		initial,
		onclick,
	}: {
		initial?: PlayerState
		onclick: (payload: TogglePayload) => void
	}) {
		this.state = initial || PlayerState.idle
    this.playSwitch.active.onclick = onclick
    this.playSwitch.inactive.onclick = onclick
  }

	public getState(): PlayerState {
		return this.state
	}

	public update(event: PlayerEvent): void {
		this.state = sketchTransitions['player'][this.state][event]
	}

	public getPlayState(): PlayerState {
		return this.playState
	}

	public getPlayLabel(): PlayerState {
		return this.playSwitch[this.playState].text
	}

	public getPlayDisabled(): PlayerState {
		return this.state === PlayerState.error ? true : undefined
	}

	public getStopDisabled(): PlayerState {
		return this.state === PlayerState.idle ||
			this.state === PlayerState.stopped ||
			this.state === PlayerState.ended
			? true
			: undefined
	}

	public getClearDisabled(): PlayerState {
		return this.state === PlayerState.idle ||
			this.state === PlayerState.stopped ||
			this.state === PlayerState.ended
			? true
			: undefined
	}
}

export default PlayerStore
