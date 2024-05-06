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
} from '$types'

export const sketchState = $state({
	sketch: SketchState.idle,
	canvas: CanvasState.idle,
	player: PlayerState.idle,
	geometry: GeometryState.untouched,
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
		[CanvasState.idle]: [],
		[CanvasState.playing]: [],
		[CanvasState.paused]: [],
		[CanvasState.ended]: [],
	},
	player: {
		[PlayerState.idle]: [PlayerAction.play],
		[PlayerState.playing]: [PlayerAction.pause, PlayerAction.stop, PlayerAction.clear],
		[PlayerState.paused]: [PlayerAction.play, PlayerAction.stop, PlayerAction.clear],
	},
	geometry: {
		[GeometryState.untouched]: [GeometryAction.update],
		[GeometryState.updated]: [GeometryAction.update],
	},
})

export const sketchTransitions = $state({
	sketch: {
		[SketchState.idle]: {
			[SketchEvent.load]: {action: SketchEvent.load, state: SketchState.loading},
		},
		[SketchState.loading]: {
			[SketchEvent.loadOk]: {state: SketchState.active},
		},
	},
	canvas: {
		[CanvasState.idle]: {
			[SketchEvent.load]: {state: CanvasState.loading},
		},
		[CanvasState.loading]: {
			[SketchEvent.loadOk]: {state: CanvasState.active},
		},
	},
	geometry: {
		[GeometryState.untouched]: {
			[GeometryEvent.update]: GeometryState.updated,
		},
		[GeometryState.updated]: {
			[PlayerEvent.clear]: GeometryState.untouched,
		},
		[GeometryState.updated]: {
			[PlayerEvent.stop]: GeometryState.untouched,
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
