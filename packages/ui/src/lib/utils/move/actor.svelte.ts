import type {
	UiAnimationEvent,
	UiBlockProps,
	FuzzyActor,
	FuzzyPayload,
	UiCoords,
} from '$types'

import type {UiStateMove} from './move.js' // TODO: move to types

import {UiState} from '$types'
import {MOVE_MACHINE, MOVE_TRANSITIONS} from './definitions.js'
import styleHelper from '$lib/utils/styles.js'

class MoveActor implements FuzzyActor {
	state: UiStateMove = $state(UiState.inactive)
	machine = $state(MOVE_MACHINE)
	transitions = MOVE_TRANSITIONS
	currentState = $derived(this.machine[this.state])
	active = $derived(this.state === UiState.active)
	value = $derived(this.currentState?.value || this.state)
	id = $derived(this.currentState?.id)
	label = $derived(this.currentState?.label || '')
	coords: UiCoords = $state({
		viewport: [0, 0], // [x, y]
		start: [0, 0], // [x, y]
		dist: [0, 0], // [x, y]
		delta: [0, 0], // [x, y]
		velocity: [0, 0], // [x, y]
	})
	threshold = $state(8) // Number of pixels a pressed pointer travels before movestart event is fired
	move = (payload: FuzzyPayload) => {}
	moveend = (payload: FuzzyPayload) => {}

	constructor({
		initial,
		movestart,
		move,
		moveend,
	}: {
		initial?: string
		movestart?: (payload: FuzzyPayload) => void
		move?: (payload: FuzzyPayload) => void
		moveend?: (payload: FuzzyPayload) => void
	}) {
		if (initial) this.state = initial as UiStateMove
		if (movestart) {
			this.machine.inactive.action = movestart
		}
		if (move) {
			this.machine.active.action = move
			this.move = move
		}
		if (moveend) {
			this.moveend = moveend
		}
	}

	getTransition(event: UiAnimationEvent): UiStateMove {
		const state = this.state as UiStateMove
		const transition = this.transitions[state][event]
		if (transition) {
			return transition as UiStateMove
		}
		return state
	}

	public update(event: UiAnimationEvent): void {
		this.state = this.getTransition(event)
	}

	public getStyles(props: UiBlockProps): string {
		return `mover ${styleHelper.getStyles(props)}`
	}
}

export default MoveActor
