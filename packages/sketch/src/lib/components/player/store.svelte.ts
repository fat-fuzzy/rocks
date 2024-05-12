import type {TogglePayload} from '$types'
import {PlayerEvent, PlayerState, PlayerAction} from './types.js'

import types from './types.js'

const {
	PLAYER_STATE,
	PLAYER_EVENTS,
	PLAYER_ACTIONS,
	PLAYER_TRANSITIONS,
	PLAYER_SWITCH
} = types

class PlayerStore {
	state = $state(PLAYER_STATE)
	playSwitch = $state(PLAYER_SWITCH)
	events = PLAYER_EVENTS
	actions = PLAYER_ACTIONS
	transitions = PLAYER_TRANSITIONS

	constructor() {
		console.log("PlayerStore constructor:", this.state);
	}

	public init({
		initial,
		onclick,
	}: {
		initial?: PlayerState
		onclick: (payload: TogglePayload) => void
	}) {
		this.state.player = initial ?? PlayerState.idle
		this.playSwitch.active.onclick = onclick
		this.playSwitch.inactive.onclick = onclick
	}

	public getState(): PlayerState {
		return this.state.player
	}

	public getPlayState(): string {
		return this.state.player === PlayerState.playing ? 'active' : 'inactive'
	}

	public getPlayLabel(): string {
		const playState = this.state.player === PlayerState.playing ? 'active' : 'inactive'
		if (this.playSwitch && this.playSwitch[playState]) {
			return this.playSwitch[playState].text
		}
		return ''
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

	public getPlayDisabled(): boolean | undefined {
		return this.state.player === PlayerState.error ? true : undefined
	}

	public getStopDisabled(): boolean | undefined {
		return this.state.player === PlayerState.idle ||
			this.state.player === PlayerState.stopped ||
			this.state.player === PlayerState.ended
			? true
			: undefined
	}

	public getClearDisabled(): boolean | undefined {
		return this.events?.current === PlayerEvent.clear ||
			this.state.player === PlayerState.idle ||
			this.state.player === PlayerState.stopped ||
			this.state.player === PlayerState.ended
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
