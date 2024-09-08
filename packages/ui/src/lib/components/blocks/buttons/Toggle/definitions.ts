import type {FuzzyTransitions, ToggleMachine} from '$types'
import {UiState, ButtonEvent} from '$types'

export const TOGGLE_MACHINE: ToggleMachine = {
	active: {
		id: UiState.active,
		state: UiState.active,
		event: ButtonEvent.toggle,
	},
	inactive: {
		id: UiState.inactive,
		state: UiState.inactive,
		event: ButtonEvent.toggle,
	},
}

export const TOGGLE_TRANSITIONS: FuzzyTransitions = {
	active: {
		toggle: UiState.inactive,
	},
	inactive: {
		toggle: UiState.active,
	},
}
