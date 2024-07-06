import {type FuzzyState, type FuzzyTransitions} from '$types/machines.js'
import type {ToggleProps} from '../Toggle/toggle.types.js'
import {UiState} from '$types/index.js'
import {ButtonEvent} from '../button.types.js'

export type UiStateSwitch = UiState.active | UiState.inactive

export type SwitchMachine = {
	active: FuzzyState
	inactive: FuzzyState
}

export const SWITCH_MACHINE: SwitchMachine = {
	active: {
		id: UiState.active,
		state: UiState.active,
		event: ButtonEvent.switch,
		text: 'Active',
		asset: 'bunny',
	},
	inactive: {
		id: UiState.active,
		state: UiState.active,
		event: ButtonEvent.switch,
		text: 'Inactive',
		asset: 'hat',
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

/**
 * This component contains a button that will Switch between these two states. Each state has its own text and asset (if any) and possible style according to its active / inactive state
 */
export type SwitchProps = ToggleProps & {
	states?: SwitchMachine
}
