import type {TogglePayload} from '$types'
import {PlayerEvent, PlayerState, PlayerAction} from '$types'

const PLAYER_STATE: {[key: string]: any} = {
	player: PlayerState.idle,
	errors: [],
}

const PLAYER_EVENTS: {[key: string]: string} = {
	previous: '',
	current: '',
}

const PLAYER_ACTIONS: {[key: string]: any} = {
	player: {
		[PlayerState.idle]: [PlayerAction.play],
		[PlayerState.playing]: [
			PlayerAction.pause,
			PlayerAction.stop,
			PlayerAction.clear,
		],
		[PlayerState.paused]: [
			PlayerAction.play,
			PlayerAction.stop,
			PlayerAction.clear,
		],
		[PlayerState.stopped]: [PlayerAction.play],
	},
}

export const PLAYER_TRANSITIONS: {[key: string]: any} = {
	player: {
		[PlayerState.idle]: {
			[PlayerEvent.play]: {state: PlayerState.playing},
		},
		[PlayerState.playing]: {
			[PlayerEvent.pause]: {state: PlayerState.paused},
			[PlayerEvent.stop]: {state: PlayerState.idle},
			[PlayerEvent.clear]: {state: PlayerState.playing},
		},
		[PlayerState.paused]: {
			[PlayerEvent.play]: {state: PlayerState.playing},
			[PlayerEvent.stop]: {state: PlayerState.idle},
			[PlayerEvent.clear]: {state: PlayerState.paused},
		},
	},
}

class PlayerStore {
	state = $state(PLAYER_STATE)
	events = $state(PLAYER_EVENTS)
	actions = $state(PLAYER_ACTIONS)
	transitions = $state(PLAYER_TRANSITIONS)
	playSwitch: {[state: string]: PlayerState} = $state({})

	constructor() {}

	public init({
		initial,
		onclick,
	}: {
		initial?: PlayerState
		onclick: (payload: TogglePayload) => void
	}) {
		this.state.player = initial ?? PlayerState.idle
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
		console.log('getPlayLabel this.state ')
		console.log(this.state?.player)
	}

	public getState(): PlayerState {
		return this.state?.player
	}

	public getPlayState(): PlayerState {
		return this.state?.player === PlayerState.playing ? 'active' : 'inactive'
	}

	public getPlayLabel(): PlayerState {
		if (!this.state?.player) {
			return 'Play'
		}
		const playState = this.getPlayState()
		if (this.playSwitch && this.playSwitch[playState]) {
			return this.playSwitch[playState].text
		}
	}

	public getNextActions(state: string): PlayerAction {
		return this.actions[state][this.state[state]]
	}

	public getErrors(key: string): string[] {
		return this.state.errors[key]
	}

	public getEvent(key: string): string {
		return this.events[key]
	}

	public getPreviousEvent(): string {
		return this.events['previous']
	}

	public getPlayDisabled(): PlayerState {
		return this.state?.player === PlayerState.error ? true : undefined
	}

	public getStopDisabled(): PlayerState {
		return this.state?.player === PlayerState.idle ||
			this.state?.player === PlayerState.stopped ||
			this.state?.player === PlayerState.ended
			? true
			: undefined
	}

	public getClearDisabled(): PlayerState {
		return this.events?.current === PlayerEvent.clear ||
			this.state?.player === PlayerState.idle ||
			this.state?.player === PlayerState.stopped ||
			this.state?.player === PlayerState.ended
			? true
			: undefined
	}

	public getTransition(key: string, event: string): string {
		const currentState = this.state[key]
		const transition = this.transitions[key][currentState]
		if (transition && transition[event]) {
			this.state[key] = transition[event].state
		}
		return this.state[key]
	}

	public update(event: PlayerEvent): void {
		this.state.player = this.getTransition('player', event)
		this.events.previous = this.events.current
		this.events.current = event

		return this.state.sketch
	}
}

const playerStore = new PlayerStore()

export default playerStore
