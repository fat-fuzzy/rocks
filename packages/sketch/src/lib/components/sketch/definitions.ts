import type {
	Filters,
	SketchStateType,
	SketchActionsType,
	SketchTransitionsType,
	SketchFeedbackType,
	SketchEventType,
} from '$types'

import {
	PlayerState,
	SketchState,
	ControlsState,
	CanvasState,
	PlayerAction,
	ControlsAction,
	SketchAction,
	CanvasAction,
	PlayerEvent,
	SketchEvent,
	ControlsEvent,
} from '$types'

import {PLAYER_TRANSITIONS} from '$lib/components/player/definitions.js'

export const DEFAULT_FILTERS: Filters = {
	channels: ['rgba'],
	blur: [0],
	convolutions: ['normal'],
}

export const SKETCH_FEEDBACK: SketchFeedbackType = {
	sketch: [],
	canvas: [],
	player: [],
	controls: [],
}

export const SKETCH_EVENTS: SketchEventType = {
	previous: '',
	current: '',
}

export const SKETCH_STATE: SketchStateType = {
	sketch: SketchState.idle,
	canvas: CanvasState.idle,
	player: PlayerState.idle,
	controls: ControlsState.hidden,
}

export const SKETCH_ACTIONS: SketchActionsType = {
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
			PlayerAction.snap,
		],
		[PlayerState.paused]: [
			PlayerAction.play,
			PlayerAction.stop,
			PlayerAction.clear,
			PlayerAction.snap,
		],
		[PlayerState.stopped]: [PlayerAction.play],
	},
	controls: {
		[ControlsState.pristine]: [ControlsAction.update],
		[ControlsState.updated]: [ControlsAction.update],
	},
}

export const SKETCH_TRANSITIONS: SketchTransitionsType = {
	sketch: {
		[SketchState.idle]: {
			[SketchEvent.load]: SketchState.loading,
		},
		[SketchState.loading]: {
			[SketchEvent.loadOk]: SketchState.active,
			[SketchEvent.loadNok]: SketchState.error,
		},
		[SketchState.active]: {
			[PlayerEvent.stop]: SketchState.idle,
			[SketchEvent.exitNok]: SketchState.error,
		},
	},
	canvas: {
		[CanvasState.idle]: {
			[PlayerEvent.play]: CanvasState.playing,
			[SketchEvent.loadNok]: CanvasState.error,
		},
		[CanvasState.playing]: {
			[PlayerEvent.pause]: CanvasState.paused,
			[PlayerEvent.stop]: CanvasState.idle,
			[PlayerEvent.clear]: CanvasState.playing,
			[PlayerEvent.snap]: CanvasState.playing,
		},
		[CanvasState.paused]: {
			[PlayerEvent.play]: CanvasState.playing,
			[PlayerEvent.stop]: CanvasState.idle,
			[PlayerEvent.clear]: CanvasState.paused,
			[PlayerEvent.snap]: CanvasState.paused,
		},
	},
	controls: {
		[ControlsState.pristine]: {
			[ControlsEvent.update]: ControlsState.updated,
			[PlayerEvent.stop]: ControlsState.hidden,
			[PlayerEvent.pause]: ControlsState.pristine,
		},
		[ControlsState.updated]: {
			[PlayerEvent.clear]: ControlsState.pristine,
			[PlayerEvent.stop]: ControlsState.hidden,
			[PlayerEvent.pause]: ControlsState.updated,
		},
		[ControlsState.hidden]: {
			[PlayerEvent.play]: ControlsState.pristine,
		},
	},
	player: PLAYER_TRANSITIONS,
}
