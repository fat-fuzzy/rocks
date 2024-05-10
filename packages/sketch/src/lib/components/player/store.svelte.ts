import type {TogglePayload} from '$types'
import {PlayerEvent, PlayerState} from '$types'

class PlayerStore {
	sketchStore: any
	state = $state(PlayerState.idle)
	playSwitch: {[state: string]: PlayerState} = $state({})

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
		this.sketchStore = sketchStore
	}

	public getState(): PlayerState {
		return this.state
	}

	public update(event: PlayerEvent): void {
		this.state = this.sketchStore.getTransition('player', event)
	}

	public getPlayState(): PlayerState {
		return this.state === PlayerState.playing ? 'active' : 'inactive'
	}

	public getPlayLabel(): PlayerState {
		const playState = this.getPlayState()
		if (this.playSwitch && this.playSwitch[playState]) {
			return this.playSwitch[playState].text
		}
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
