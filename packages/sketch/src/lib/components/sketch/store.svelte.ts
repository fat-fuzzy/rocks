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

export const sketchState = $state({
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
})

export const sketchEvents = $state({
	previous: '',
	current: '',
})

export const sketchActions = $state({
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
})

export const sketchTransitions = $state({
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
})
