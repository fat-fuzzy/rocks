import type {FeedbackType} from '$types'
import {
	PlayerEvent,
	PlayerState,
	PlayerAction,
	type PlayerPayload,
} from './types.js'

import {
	type PlayerSwitchType,
	type PlayerEventsType,
	PLAYER_EVENTS,
	PLAYER_ACTIONS,
	PLAYER_TRANSITIONS,
	PLAYER_SWITCH,
} from './types.js'
class PlayerStore {
	state = $state(PlayerState.idle)
	events: PlayerEventsType = PLAYER_EVENTS
	feedback: FeedbackType[] = $state([])
	playSwitch: PlayerSwitchType = $state(PLAYER_SWITCH)
	actions = PLAYER_ACTIONS
	transitions = PLAYER_TRANSITIONS

	public init({
		initial,
		onclick,
	}: {
		initial?: PlayerState
		onclick: (payload: PlayerPayload) => void
	}) {
		this.state = initial ?? PlayerState.idle
		this.playSwitch.active.onclick = onclick
		this.playSwitch.inactive.onclick = onclick
	}

	public getState(): PlayerState {
		return this.state
	}

	public getPlayState(): string {
		return this.state === PlayerState.playing ? 'active' : 'inactive'
	}

	public getPlayLabel(): string {
		const playState = this.state === PlayerState.playing ? 'active' : 'inactive'
		if (this.playSwitch && this.playSwitch[playState]) {
			return this.playSwitch[playState].text
		}
		return ''
	}

	public getNextActions(state: PlayerState): PlayerAction[] | undefined {
		return this.actions[state]
	}

	public getErrors(): string[] {
		return this.feedback
	}

	public getCurrentEvent(): string {
		return this.events.current
	}

	public getPreviousEvent(): string {
		return this.events.previous
	}

	public getPlayDisabled(): boolean | undefined {
		const actions = this.actions[this.state]
		return actions?.includes(PlayerAction.play) ||
			actions?.includes(PlayerAction.pause)
			? undefined
			: true
	}

	public getStopDisabled(): boolean | undefined {
		const actions = this.actions[this.state]
		return actions?.includes(PlayerAction.stop) ? undefined : true
	}

	public getClearDisabled(): boolean | undefined {
		const actions = this.actions[this.state]
		return actions?.includes(PlayerAction.clear) ? undefined : true
	}

	public getTransition(event: PlayerEvent): PlayerState {
		const transition = this.transitions[this.state]
		if (transition) {
			return transition[event] ?? this.state
		}
		return this.state
	}

	public update(event: PlayerEvent): void {
		this.state = this.getTransition(event)
		this.events.previous = this.events.current
		this.events.current = event
	}
}

const stateStore = new PlayerStore()

export default stateStore
