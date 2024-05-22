import {SketchState, ControlsState, CanvasState} from '$types/index.js'
import type {Filters} from '$types/index.js'

import {PlayerState} from '$lib/components/player/types.js'

import {
	type UiState,
	type UiEvent,
	type UiAction,
	type SketchUi,
	type SketchStateType,
	type SketchActionsType,
	type SketchTransitionsType,
	type SketchFeedbackType,
	type SketchEventType,
	SKETCH_FEEDBACK,
	SKETCH_EVENTS,
	SKETCH_STATE,
	SKETCH_ACTIONS,
	SKETCH_TRANSITIONS,
} from './types.js'
class SketchStore {
	public state: SketchStateType = $state(SKETCH_STATE)
	public events: SketchEventType = $state(SKETCH_EVENTS)
	public feedback: SketchFeedbackType = $state(SKETCH_FEEDBACK)
	public actions: SketchActionsType = $state(SKETCH_ACTIONS)
	public transitions: SketchTransitionsType = $state(SKETCH_TRANSITIONS)

	constructor() {}

	public getState(
		key: SketchUi,
	): SketchState | ControlsState | PlayerState | CanvasState {
		return this.state[key]
	}

	public getCanvasState(): CanvasState {
		return this.state.canvas as CanvasState
	}

	public getPlayerState(): PlayerState {
		return this.state.player as PlayerState
	}

	public getControlsState(): ControlsState {
		return this.state.controls as ControlsState
	}

	public getPlayButtonState(): string {
		return this.state.player === PlayerState.playing ? 'active' : 'inactive'
	}

	public getNextActions(state: SketchUi): UiAction[] | undefined {
		return this.actions[state][this.state[state]]
	}

	public getFeedback(key: SketchUi): {status: string; message: string}[] {
		return this.feedback[key]
	}

	public hasError(): boolean {
		const feedbacks = Object.values(this.feedback)
		const errors = feedbacks.filter((feedback) =>
			feedback.find(({status}) => status === 'error'),
		)
		return Boolean(errors.length)
	}

	public getCurrentEvent(): UiEvent | '' {
		return this.events.current
	}

	public getPreviousEvent(): UiEvent | '' {
		return this.events.previous
	}

	public getSketchDisabled(): boolean | undefined {
		return this.state.canvas === CanvasState.idle ||
			this.state.canvas === CanvasState.paused
			? true
			: undefined
	}

	public getIsInteractive(): boolean | undefined {
		return this.state.canvas === CanvasState.playing ||
			this.state.canvas === CanvasState.paused
			? true
			: undefined
	}

	public getTransition(key: SketchUi, event: UiEvent): UiState {
		const currentState = this.state[key]
		const transition = this.transitions[key]
		if (transition) {
			const transitionState = transition[currentState]
			if (transitionState && transitionState[event]) {
				this.state[key] = transitionState[event] as UiState
			}
		}
		return this.state[key]
	}

	public update(event: UiEvent): void {
		this.state.sketch = this.getTransition('sketch', event)
		this.state.player = this.getTransition('player', event)
		this.state.canvas = this.getTransition('canvas', event)
		this.state.controls = this.getTransition('controls', event)
		const previous = this.events.current
		this.events.current = event
		this.events.previous = previous
	}

	public updateFilters(filters: Filters, event: UiEvent): void {
		// TODO: implement
		this.state.canvas = this.getTransition('canvas', event)
		this.state.controls = this.getTransition('controls', event)
		this.events.previous = this.events.current
		this.events.current = event
	}
}

const sketchStore = new SketchStore()

export default sketchStore
