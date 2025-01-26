import {UiEffect, UiState} from '$types'

export type UiStateDnd = UiState.inactive | UiState.hovering

export type DndMachine = {
	inactive: FuzzyState
	active: FuzzyState
	hovering: FuzzyState
}
