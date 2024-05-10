import {
	SketchEvent,
	SketchState,
	SketchAction,
	PlayerEvent,
	PlayerState,
	ControlsEvent,
	ControlsState,
	ControlsAction,
	PlayerAction,
	CanvasState,
	CanvasAction,
} from '$types'
import type {CanvasEvent} from '../../types/index.js'

const SKETCH_STATE: {[key: string]: any} = {
	sketch: SketchState.idle,
	canvas: CanvasState.idle,
	player: PlayerState.idle,
	controls: ControlsState.pristine,
	errors: {
		sketch: [],
		canvas: [],
		player: [],
		controls: [],
	},
}

const SKETCH_EVENTS: {[key: string]: string} = {
	previous: '',
	current: '',
}

const SKETCH_ACTIONS: {[key: string]: any} = {
	sketch: {
		[SketchState.idle]: [SketchAction.load],
		[SketchState.active]: [SketchAction.exit],
	},
	canvas: {
		[CanvasState.idle]: [CanvasAction.play],
		[CanvasState.playing]: [
			CanvasAction.pause,
			CanvasAction.clear,
			CanvasAction.stop,
		],
		[CanvasState.paused]: [
			CanvasAction.play,
			CanvasAction.clear,
			CanvasAction.stop,
		],
		[CanvasState.stopped]: [CanvasAction.play],
	},
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
	controls: {
		[ControlsState.pristine]: ControlsAction.update,
		[ControlsState.updated]: ControlsAction.update,
	},
}

export const SKETCH_TRANSITIONS: {[key: string]: any} = {
	sketch: {
		[SketchState.idle]: {
			[SketchEvent.load]: {
				action: SketchEvent.load,
				state: SketchState.loading,
			},
		},
		[SketchState.loading]: {
			[SketchEvent.loadOk]: {state: SketchState.active},
			[SketchEvent.loadNok]: {state: SketchState.error},
		},
	},
	canvas: {
		[CanvasState.idle]: {
			[PlayerEvent.play]: {state: CanvasState.playing},
		},
		[CanvasState.playing]: {
			[PlayerEvent.pause]: {state: CanvasState.paused},
			[PlayerEvent.stop]: {state: CanvasState.idle},
			[PlayerEvent.clear]: {state: CanvasState.idle},
		},
		[CanvasState.paused]: {
			[PlayerEvent.play]: {state: CanvasState.playing},
			[PlayerEvent.stop]: {state: CanvasState.idle},
			[PlayerEvent.clear]: {state: CanvasState.idle},
		},
	},
	controls: {
		[ControlsState.pristine]: {
			[ControlsEvent.update]: ControlsState.updated,
		},
		[ControlsState.updated]: {
			[PlayerEvent.clear]: ControlsState.pristine,
		},
	},
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

class SketchStore {
	state = $state(SKETCH_STATE)
	events = $state(SKETCH_EVENTS)
	actions = $state(SKETCH_ACTIONS)
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

	public getPlayButtonState(): PlayerState {
		return this.state === this.state.player ? 'active' : 'inactive'
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
		return this.events[key]
	}

	public getPreviousEvent(): string {
		return this.events['previous']
	}

	public getSketchDisabled(): boolean {
		return (
			this.state.canvas === CanvasState.idle ||
			this.state.canvas === CanvasState.paused
		)
	}

	public getMenuDisabled(): boolean {
		return (
			this.state.canvas === CanvasState.idle ||
			this.state.canvas === CanvasState.paused
		)
	}

	public getIsInteractive(): boolean {
		return (
			this.state.canvas === CanvasState.playing ||
			this.state.canvas === CanvasState.paused ||
			this.state.canvas === CanvasState.ended
		)
	}

	public getTransition(key: string, event: string): string {
		const currentState = this.state[key]
		const transition = this.transitions[key][currentState]
		console.log('getTransition  key', key)
		console.log('getTransition  event', event)
		console.log('getTransition   this.state[key]', this.state[key])
		console.log('getTransition   transition', transition)
		if (transition && transition[event]) {
			this.state[key] = transition[event].state
		}
		return this.state[key]
	}

	public update(
		event: SketchEvent | CanvasEvent | PlayerEvent | ControlsEvent,
	): void {
		console.log('update  event', event)
		this.state.sketch = this.getTransition('sketch', event)
		this.state.player = this.getTransition('player', event)
		this.state.canvas = this.getTransition('canvas', event)
		this.state.controls = this.getTransition('controls', event)
		this.events.previous = this.events.current
		this.events.current = event

		return this.state.sketch
	}

	public updateFilters(
		event: SketchEvent | CanvasEvent | PlayerEvent | ControlsEvent,
	): void {
		// TODO: implement
		console.log(event)
	}
}

export default SketchStore
