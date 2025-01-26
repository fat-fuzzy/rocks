import {
	FuzzyState,
	UiEffect,
	UiState,
	MoveEvent,
	UiCoords,
	UiAnimationEvent,
} from '$types'

export type UiStateMove = UiState.inactive | UiState.active
export type UiEventMove = {
	[event: UiAnimationEvent]: UiCoords
}

export type MoveMachine = {
	inactive: FuzzyState
	active: FuzzyState
}
