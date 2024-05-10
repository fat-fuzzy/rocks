import {
	SketchEvent,
	SketchState,
	SketchAction,
	PlayerEvent,
	PlayerState,
	GeometryEvent,
	GeometryState,
	GeometryAction,
	PlayerAction,
	CanvasState,
	CanvasAction,
} from '$types'
import type { CanvasEvent } from '../../types/index.js'

const SKETCH_STATE: {[key:string]: any} = {
	sketch: SketchState.idle,
	canvas: CanvasState.idle,
	player: PlayerState.idle,
	geometry: GeometryState.untouched,
	errors: {
		sketch: [],
		canvas: [],
		player: [],
		geometry: [],
	},
}

const SKETCH_EVENTS: {[key:string]: string} = {
	previous: '',
	current: '',
}

const SKETCH_ACTIONS: {[key:string]: any} = {
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
	geometry: {
		[GeometryState.untouched]: [GeometryAction.update],
		[GeometryState.updated]: [GeometryAction.update],
	},
}

export const SKETCH_TRANSITIONS = {
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
	geometry: {
		[GeometryState.untouched]: {
			[GeometryEvent.update]: GeometryState.updated,
		},
		[GeometryState.updated]: {
			[PlayerEvent.clear]: GeometryState.untouched,
		},
	},
	player: {
		[PlayerState.idle]: {
			[PlayerEvent.play]: {state: PlayerState.playing},
		},
		[PlayerState.playing]: {
			[PlayerEvent.pause]: {state: PlayerState.paused},
			[PlayerEvent.stop]: {state: PlayerState.idle},
		},
		[PlayerState.paused]: {
			[PlayerEvent.play]: {state: PlayerState.playing},
			[PlayerEvent.stop]: {state: PlayerState.idle},
		},
	},
}

class SketchStore {
  state = $state(SKETCH_STATE)
  events = $state(SKETCH_EVENTS)
  actions = $state(SKETCH_ACTIONS)
  transitions = $state(SKETCH_TRANSITIONS)


	constructor() {}

  public getState(key:string): SketchState {
    return this.state[key]
  }

  public getCanvasState(): CanvasState {
    return this.state.canvas
  }

  public getPlayerState(): PlayerState {
    return this.state.player
  }

  public getPlayButtonState(): PlayerState {
    return   this.state === this.state.player? 'active' : 'inactive'
  }

  public getGeometryState(): GeometryState {
    return this.state.geometry
  }

  public getNextActions(state: string): SketchAction {
    return this.actions[state][this.state[state]]
  }

  // public getSketchNextActions(): SketchAction {
  //   return this.actions.sketch[this.state.sketch]
  // }

  // public getCanvasNextActions(): SketchAction {
  //   return this.actions.canvas[this.state.canvas]
  // }

  // public getPlayerNextActions(): SketchAction { 
  //   return this.actions.player[this.state.player]
  // }

  // public getGeometryNextActions(): SketchAction {
  //   return this.actions.geometry[this.state.geometry]
  // }

  public getErrors(key: string): string[]{
    return this.state.errors[key]
  }

  public getEvent(key: string):string {
    return this.events[key]
  }

  public getPreviousEvent():string{
    return this.events['previous']
  }

  public getSketchDisabled(): boolean {
    return 	this.state.canvas === CanvasState.idle ||
    this.state.canvas === CanvasState.paused
  }

  public getMenuDisabled(): boolean {
    return this.state.canvas === CanvasState.idle ||
			this.state.canvas === CanvasState.paused
  }

  public getIsInteractive(): boolean {
    return this.state.canvas === CanvasState.playing ||
    this.state.canvas === CanvasState.paused ||
    this.state.canvas === CanvasState.ended
  }
  
  public update(event : SketchEvent | CanvasEvent | PlayerEvent | GeometryEvent): void {

    this.state.sketch = this.transitions['sketch'][this.state.sketch][event]
    this.state.player = this.transitions['player'][this.state.player][event]
    this.state.canvas = this.transitions['canvas'][this.state.canvas][event]
    this.state.geometry = this.transitions['geometry'][this.state.geometry][event]
		this.events.previous = this.events.current
		this.events.current = event

    return this.state.sketch
  }
  
  public updateFilters(event : SketchEvent | CanvasEvent | PlayerEvent | GeometryEvent): void {

    this.state.sketch = this.transitions['sketch'][this.state.sketch][event]
    this.state.player = this.transitions['player'][this.state.player][event]
    this.state.canvas = this.transitions['canvas'][this.state.canvas][event]
    this.state.geometry = this.transitions['geometry'][this.state.geometry][event]
		this.events.previous = this.events.current
		this.events.current = event

    return this.state.sketch
  }
}


export default SketchStore
