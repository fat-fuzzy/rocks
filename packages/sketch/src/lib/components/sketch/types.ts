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
	type FeedbackType,
	type Filters,
} from '$types/index.js'

import {
	PlayerEvent,
	PlayerState,
	PlayerAction,
	PLAYER_TRANSITIONS,
} from '$lib/components/player/types.js'

export type SketchUi = 'sketch' | 'canvas' | 'player' | 'controls'

export type UiState = SketchState | ControlsState | PlayerState | CanvasState

export type UiEvent = SketchEvent | ControlsEvent | PlayerEvent | CanvasEvent

export type UiAction =
	| SketchAction
	| ControlsAction
	| PlayerAction
	| CanvasAction

export type SketchFeedbackType = {
	[ui in SketchUi]: FeedbackType[]
}

export type SketchEventType = {
	previous: UiEvent | ''
	current: UiEvent | ''
}

export type SketchStateType = {
	[ui in SketchUi]: UiState
}

export type SketchActionsType = {
	[ui in SketchUi]: {
		[state in UiState]?: UiAction[]
	}
}

export type SketchTransitionsType = {
	[ui in SketchUi]?: {
		[state in UiState]?: {
			[event in UiEvent]?: UiState
		}
	}
}

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
