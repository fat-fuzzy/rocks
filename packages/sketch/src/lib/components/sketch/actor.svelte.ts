import type {
	UiState,
	UiEvent,
	UiAction,
	SketchUi,
	SketchStateType,
	SketchActionsType,
	SketchTransitionsType,
	SketchFeedbackType,
	SketchEventType,
	SceneContext,
} from '$types'

import {PlayerState, SketchState, ControlsState, CanvasState} from '$types'

import {
	SKETCH_FEEDBACK,
	SKETCH_EVENTS,
	SKETCH_STATE,
	SKETCH_ACTIONS,
	SKETCH_TRANSITIONS,
} from './definitions.js'

class SketchActor {
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

	public getControlsState(): ControlsState {
		return this.state.controls as ControlsState
	}

	public getPlayButtonState(): string {
		return this.state.canvas === PlayerState.playing ? 'active' : 'inactive'
	}

	public getNextActions(ui: SketchUi): UiAction[] | undefined {
		return this.actions[ui][this.state[ui]]
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

	public getTransition(ui: SketchUi, event: UiEvent): UiState {
		const currentState = this.state[ui]
		const transitions = this.transitions[ui]
		if (transitions) {
			const transitionState = transitions[currentState]
			if (transitionState && transitionState[event]) {
				this.state[ui] = transitionState[event] as UiState
			}
		}
		return this.state[ui]
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

	public updateTexture({texture}: SceneContext, event: UiEvent): void {
		// TODO: implement
		this.update(event)
	}
}

const actor = new SketchActor()

export default actor
