import type {FeedbackType, Filters} from '$types'
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
	PlayerEvent,
	PlayerState,
	PlayerAction,
} from '$types'

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
