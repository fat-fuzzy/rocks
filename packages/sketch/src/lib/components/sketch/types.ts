import {
	SketchEvent,
	SketchState,
	SketchAction,
	ControlsEvent,
	ControlsState,
	ControlsAction,
	CanvasState,
	CanvasAction,
	CanvasEvent,
	type Filters,
} from '$types/index.js'

import {
	PlayerEvent,
	PlayerState,
	PlayerAction,
} from '$lib/components/player/types.js'

export type SketchUi = 'sketch' | 'canvas' | 'player' | 'controls'
export type FeedbackType = {
	status: string
	message: string
}

export type SketchFeedbackType = {
	[key: string]: FeedbackType[]
}

export type SketchEventType = {
	previous: SketchEvent | ControlsEvent | PlayerEvent | CanvasEvent | ''
	current: SketchEvent | ControlsEvent | PlayerEvent | CanvasEvent | ''
}

export type SketchStateType = {
	[key in SketchUi]?: SketchState | ControlsState | PlayerState | CanvasState
}

export type SketchActionsType = {
	[key in SketchUi]?: {
		[key in SketchState | ControlsState | PlayerState | CanvasState]?: (
			| SketchAction
			| PlayerAction
			| ControlsAction
			| CanvasAction
		)[]
	}
}

export type SketchTransitionsType = {
	[key in SketchUi]?: {
		[key in SketchState | ControlsState | PlayerState | CanvasState]?: {
			[key in SketchEvent | ControlsEvent | PlayerEvent | CanvasEvent]?:
				| SketchState
				| ControlsState
				| PlayerState
				| CanvasState
		}
	}
}

export const DEFAULT_FILTERS: Filters = {
	channels: 'rgba',
	blur: 0,
	effects: ['normal'],
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
	controls: ControlsState.pristine,
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
		],
		[PlayerState.paused]: [
			PlayerAction.play,
			PlayerAction.stop,
			PlayerAction.clear,
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
		},
	},
	canvas: {
		[CanvasState.idle]: {
			[PlayerEvent.play]: CanvasState.playing,
		},
		[CanvasState.playing]: {
			[PlayerEvent.pause]: CanvasState.paused,
			[PlayerEvent.stop]: CanvasState.idle,
			[PlayerEvent.clear]: CanvasState.playing,
		},
		[CanvasState.paused]: {
			[PlayerEvent.play]: CanvasState.playing,
			[PlayerEvent.stop]: CanvasState.idle,
			[PlayerEvent.clear]: CanvasState.paused,
		},
	},
	controls: {
		[ControlsState.pristine]: {
			[ControlsEvent.update]: ControlsState.updated,
			[PlayerEvent.stop]: ControlsState.pristine,
		},
		[ControlsState.updated]: {
			[PlayerEvent.clear]: ControlsState.pristine,
		},
	},
	player: {
		[PlayerState.idle]: {
			[PlayerEvent.play]: PlayerState.playing,
		},
		[PlayerState.playing]: {
			[PlayerEvent.pause]: PlayerState.paused,
			[PlayerEvent.stop]: PlayerState.idle,
			[PlayerEvent.clear]: PlayerState.playing,
		},
		[PlayerState.paused]: {
			[PlayerEvent.play]: PlayerState.playing,
			[PlayerEvent.stop]: PlayerState.idle,
			[PlayerEvent.clear]: PlayerState.paused,
		},
	},
}
