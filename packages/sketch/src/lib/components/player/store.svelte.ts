import type {TogglePayload} from '$types'
import {PlayerEvent, PlayerState} from '$types'

class PlayerStore {
	sketchStore: any
	state = $state(PlayerState.idle)
	playState = $derived(
		this.state === PlayerState.playing ? 'active' : 'inactive',
	)
	playSwitch: {[state: string]: PlayerState} = $state({
		active: {
			value: PlayerEvent.pause,
			text: 'Pause',
			asset: 'emoji:pause',
			variant: 'outline',
			onclick: function (payload: TogglePayload) {
				return payload
			},
		},
		inactive: {
			value: PlayerEvent.play,
			text: 'Play',
			asset: 'emoji:play',
			variant: 'fill',
			onclick: function (payload: TogglePayload) {
				return payload
			},
		},
	})

	constructor({
		initial,
		onclick,
		sketchStore,
	}: {
		initial?: PlayerState
		sketchStore: any
		onclick: (payload: TogglePayload) => void
	}) {
		this.state = initial || PlayerState.idle
		this.playSwitch.active.onclick = onclick
		this.playSwitch.inactive.onclick = onclick
		this.sketchStore = sketchStore
	}

	public getState(): PlayerState {
		return this.state
	}

	public update(event: PlayerEvent): void {
		this.state = this.sketchStore.getTransition('player', event)
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
