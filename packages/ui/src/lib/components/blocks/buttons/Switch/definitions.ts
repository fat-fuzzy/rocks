import type {FuzzyTransitions, SwitchMachine} from '$types'
import {UiState, ButtonEvent} from '$types'

export const SWITCH_MACHINE: SwitchMachine = {
	active: {
		id: UiState.active,
		state: UiState.active,
		event: ButtonEvent.switch,
		label: 'Active',
	},
	inactive: {
		id: UiState.inactive,
		state: UiState.inactive,
		event: ButtonEvent.switch,
		label: 'Inactive',
	},
}

export const SWITCH_TRANSITIONS: FuzzyTransitions = {
	active: {
		switch: UiState.inactive,
	},
	inactive: {
		switch: UiState.active,
	},
}
