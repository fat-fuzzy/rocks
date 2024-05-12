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

const  {
	SKETCH_STATE,
	SKETCH_ACTIONS,
	SKETCH_TRANSITIONS,
} = types
class SketchStore {
	state = $state(SKETCH_STATE)
	actions =  $state(SKETCH_ACTIONS)
	transitions = $state(SKETCH_TRANSITIONS)

	constructor() {}

	public getState(key: string): SketchState {
		return this.state[key]
	}

	public getCanvasState(): CanvasState {
		return this.state.canvas
	}

	public getPlayerState(): PlayerState {
		return this.state.player
	}

	public getPlayButtonState(): string {
		return this.state.player === PlayerState.playing ? 'active' : 'inactive'
	}

	public getControlsState(): ControlsState {
		return this.state.controls
	}

	public getNextActions(state: string): SketchAction {
		return this.actions[state][this.state[state]]
	}

	public getErrors(key: string): string[] {
		return this.state.errors[key]
	}

	public getEvent(key: string): string {
		return this.state.events[key]
	}

	public getPreviousEvent(): string {
		return this.state.events['previous']
	}

	public getSketchDisabled(): boolean | undefined  {
		return this.state.canvas === CanvasState.idle ||
			this.state.canvas === CanvasState.paused ? true : undefined
	}

	public getFiltersDisabled(): boolean | undefined {
		return this.state.canvas === CanvasState.idle ||
			this.state.canvas === CanvasState.paused ? true : undefined
	}

	public getIsInteractive(): boolean | undefined {
		console.log('getIsInteractive, this.state.canvas', this.state.canvas);

		return this.state.canvas === CanvasState.playing ||
			this.state.canvas === CanvasState.paused ||
			this.state.canvas === CanvasState.ended
			? true : undefined
	}

	public getTransition(key: string, event: string): string {
		const currentState = this.state[key]
		const transition = this.transitions[key][currentState]
		if (transition && transition[event]) {
			this.state[key] = transition[event].state
		}
		return this.state[key]
	}

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
