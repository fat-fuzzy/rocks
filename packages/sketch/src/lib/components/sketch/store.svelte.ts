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
	events: {
		previous: '',
		current: '',
	}
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
	state = SKETCH_STATE
	actions = SKETCH_ACTIONS
	transitions = SKETCH_TRANSITIONS

	constructor() {
		console.log("SketchStore constructor:", this.state);
	}

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

	public getSketchDisabled(): boolean {
		return (
			this.state.canvas === CanvasState.idle ||
			this.state.canvas === CanvasState.paused
		)
	}

	public getMenuDisabled(): boolean | undefined {
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

		return this.state.sketch
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
