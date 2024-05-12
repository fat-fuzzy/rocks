import {
	SketchEvent,
	SketchState,
	SketchAction,
	ControlsEvent,
	ControlsState,
	ControlsAction,
	CanvasState,
	CanvasAction,
	type Filters
} from '$types'

import {PlayerEvent, PlayerState, PlayerAction} from '$lib/components/player/types'

const DEFAULT_FILTERS: Filters = {
	channels: 'rgba',
	blur: 0,
	effects: ['normal'],
}

const SKETCH_STATE: {[key: string]: any} = {
	sketch: SketchState.idle,
	canvas: CanvasState.idle,
	player: PlayerState.idle,
	controls: ControlsState.pristine,
	feedback: {
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

const SKETCH_TRANSITIONS: {[key: string]: any} = {
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

export default {
	DEFAULT_FILTERS,
	SKETCH_STATE,
	SKETCH_ACTIONS,
	SKETCH_TRANSITIONS,
}
