import type {FuzzyPayload} from '@fat-fuzzy/ui'

import type {
	FeedbackType,
	PlayerSwitchType,
	PlayerEventsType,
	PlayerState,
	PlayerEvent,
	PlayerAction,
} from '$types'

import {
	PLAYER_EVENTS,
	PLAYER_ACTIONS,
	PLAYER_TRANSITIONS,
	PLAYER_SWITCH,
} from '$lib/components/player/definitions.js'
class PlayerActor {
	state: PlayerState = $state('idle')
	events: PlayerEventsType = PLAYER_EVENTS
	feedback: FeedbackType[] = $state([])
	playSwitch: PlayerSwitchType = $state(PLAYER_SWITCH)
	playState = $derived(this.state === 'playing' ? 'active' : 'inactive')
	playLabel = $derived.by(() => {
		{
			const playState = this.state === 'playing' ? 'active' : 'inactive'
			if (this.playSwitch && this.playSwitch[playState]) {
				return this.playSwitch[playState].text
			}
			return ''
		}
	})
	actions = PLAYER_ACTIONS
	transitions = PLAYER_TRANSITIONS

	public init({
		initial,
		onclick,
	}: {
		initial?: PlayerState
		onclick: (payload: FuzzyPayload) => void
	}) {
		this.state = initial ?? 'idle'
		this.playSwitch.active.onclick = onclick
		this.playSwitch.inactive.onclick = onclick
	}

	public getState(): PlayerState {
		return this.state
	}

	public getNextActions(state: PlayerState): PlayerAction[] | undefined {
		return this.actions[state]
	}

	public getErrors(): FeedbackType[] {
		return this.feedback
	}

	// TODO:Fix this method to return the correct type
	public getCurrentEvent(): string {
		return this.events.current
	}

	// TODO:Fix this method to return the correct type
	public getPreviousEvent(): string {
		return this.events.previous
	}

	public getPlayDisabled(): boolean | undefined {
		const actions = this.actions[this.state]
		return actions?.includes('play') || actions?.includes('pause')
			? undefined
			: true
	}

	public getStopDisabled(): boolean | undefined {
		const actions = this.actions[this.state]
		return actions?.includes('stop') ? undefined : true
	}

	public getClearDisabled(): boolean | undefined {
		const actions = this.actions[this.state]
		return actions?.includes('clear') ? undefined : true
	}

	public getSnapDisabled(): boolean | undefined {
		const actions = this.actions[this.state]
		return actions?.includes('snap') ? undefined : true
	}

	public getTransition(event: PlayerEvent): PlayerState {
		const transition = this.transitions[this.state]
		if (transition) {
			return transition[event] ?? this.state
		}
		return this.state
	}

	// TODO:Fix this method to update events correctly + Add tests
	public update(event: PlayerEvent): void {
		this.state = this.getTransition(event)
		this.events.previous = this.events.current
		this.events.current = event
	}
}

const actor = new PlayerActor()

export default actor
