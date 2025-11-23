import type {FuzzyState, ToggleProps} from '$types'
import {UiState} from '$types'

export type UiStateSwitch = typeof UiState.active | typeof UiState.inactive

export type SwitchMachine = {
	[UiState.active]: FuzzyState
	[UiState.inactive]: FuzzyState
}

/**
 * This component contains a button that will Switch between these two states. Each state has its own text and asset (if any) and possible style according to its active / inactive state
 */
export type SwitchProps = ToggleProps & {
	states?: SwitchMachine
}
