import {
	SketchEvent,
	SketchState,
	SketchAction,
	ControlsEvent,
	ControlsState,
	CanvasState,
} from '$types'
import type {CanvasEvent} from '$types'

import {PlayerEvent, PlayerState} from '$lib/components/player/types.js'

import types from './types.js'

const {SKETCH_STATE, SKETCH_ACTIONS, SKETCH_TRANSITIONS} = types
class SketchStore {
	state = $state(SKETCH_STATE)
	actions = $state(SKETCH_ACTIONS)
	transitions = $state(SKETCH_TRANSITIONS)

	constructor() {}

	public getState(key: string): SketchState {
		return this.state[key]
	}

	public getCanvasState(): CanvasState {
		return this.state.canvas
	}

	// TODO: fix types
	public getPlayerState(): PlayerState {
		return this.state.player
	}

	public getPlayButtonState(): string {
		return this.state.player === PlayerState.playing ? 'active' : 'inactive'
	}

	public getControlsState(): ControlsState {
		return this.state.controls
	}

	// TODO: fix types
	public getNextActions(state: string): SketchAction {
		return this.actions[state][this.state[state]]
	}

	// TODO: fix types
	public getFeedback(key: string): string[] {
		return this.state.feedback[key]
	}

	// TODO: fix types
	public hasError(): boolean {
		return this.state.feedback.find(({status}) => status === 'error')
			? true
			: false
	}

	// TODO: fix types
	public getEvent(key: string): string {
		return this.state.events[key]
	}

	// TODO: fix types
	public getPreviousEvent(): string {
		return this.state.events.previous
	}

	// TODO: Use ACTIONS
	public getSketchDisabled(): boolean | undefined {
		return this.state.canvas === CanvasState.idle ||
			this.state.canvas === CanvasState.paused
			? true
			: undefined
	}

	// TODO: Use ACTIONS
	public getIsInteractive(): boolean | undefined {
		return this.state.canvas === CanvasState.playing ||
			this.state.canvas === CanvasState.paused ||
			this.state.canvas === CanvasState.ended
			? true
			: undefined
	}

	// TODO: fix types
	public getTransition(key: string, event: string): string {
		const currentState = this.state[key]
		const transition = this.transitions[key][currentState]
		if (transition && transition[event]) {
			this.state[key] = transition[event].state
		}
		return this.state[key]
	}

	// TODO: fix types
	public update(
		event: SketchEvent | CanvasEvent | PlayerEvent | ControlsEvent,
	): void {
		this.state.sketch = this.getTransition('sketch', event)
		this.state.player = this.getTransition('player', event)
		this.state.canvas = this.getTransition('canvas', event)
		this.state.controls = this.getTransition('controls', event)
		const previous = this.state.events.current
		this.state.events.current = event
		this.state.events.previous = previous
	}

	public updateFilters(
		event: SketchEvent | CanvasEvent | PlayerEvent | ControlsEvent,
	): void {
		// TODO: implement
		console.log(event)
	}
}

const sketchStore = new SketchStore()

export default sketchStore
