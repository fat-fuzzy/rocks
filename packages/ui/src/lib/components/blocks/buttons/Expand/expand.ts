import type {FuzzyState, ToggleProps} from '$types'
import {UiState} from '$types'

export type UiStateExpand = typeof UiState.expanded | typeof UiState.collapsed

export type ExpandMachine = {
	expanded: FuzzyState
	collapsed: FuzzyState
}
/**
 * This component contains a button that will Switch between these two states. Each state has its own text and asset (if any) and possible style according to its active / inactive state
 */
export type ExpandProps = ToggleProps & {
	controls: string
	states?: ExpandMachine
}
