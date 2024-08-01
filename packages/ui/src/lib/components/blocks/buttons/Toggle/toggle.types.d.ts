import type {Snippet} from 'svelte'

export type UiStateToggle = UiState.active | UiState.inactive

export type ToggleMachine = {
	active: FuzzyState
	inactive: FuzzyState
}

/**
 * This component contains a button that will Toggle between these two states. Each state has its own text and asset (if any) and possible style according to its active / inactive state
 */
export type ToggleProps = UiBlockProps & {
	/**
	 * State props
	 */
	id: string // Use for machine id
	name: string
	title?: string
	disabled?: boolean
	formaction?: string
	type?: ButtonType
	children?: Snippet
	text?: string
	initial?: string
	value?: string | number
	states?: FuzzyMachine
	onclick?: (payload: FuzzyPayload) => void
	init?: (payload: FuzzyPayload) => void
}
