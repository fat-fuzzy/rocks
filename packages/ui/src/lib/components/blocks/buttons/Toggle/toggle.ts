import type {FuzzyState, ButtonStateProps} from '$lib/types'

export type UiStateToggle = 'active' | 'inactive'

export type ToggleMachine = {
	active: FuzzyState
	inactive: FuzzyState
}

/**
 * This component contains a button that will Toggle between two states. Each state has its own text and optional asset and style according to its active / inactive state
 */
export type ToggleProps = ButtonStateProps & {
	states?: ToggleMachine
}
