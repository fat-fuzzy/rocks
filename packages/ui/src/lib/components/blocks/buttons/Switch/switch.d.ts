import type {FuzzyState, ToggleProps} from '$types'
import {UiState, ButtonEvent} from '$types'

export type UiStateSwitch = UiState.active | UiState.inactive

export type SwitchMachine = {
	active: FuzzyState
	inactive: FuzzyState
}

/**
 * This component contains a button that will Switch between these two states. Each state has its own text and asset (if any) and possible style according to its active / inactive state
 */
export type SwitchProps = ToggleProps & {
	states?: SwitchMachine
}
