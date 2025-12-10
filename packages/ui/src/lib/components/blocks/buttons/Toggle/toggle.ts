import type {Snippet} from 'svelte'
import type {
	ButtonType,
	FuzzyPayload,
	FuzzyState,
	FuzzyMachine,
	UiBlockProps,
} from '$lib/types'

export type UiStateToggle = 'active' | 'inactive'

export type ToggleMachine = {
	active: FuzzyState
	inactive: FuzzyState
}

/**
 * This component contains a button that will Toggle between two states. Each state has its own text and optional asset and style according to its active / inactive state
 */
export type ToggleProps = UiBlockProps & {
	/**
	 * State props
	 */
	id: string // Use for machine id
	name: string
	title?: string
	label?: string
	disabled?: boolean
	formaction?: string
	type?: ButtonType
	children?: Snippet
	text?: string
	initial?: string // Initial state of the button
	value?: string | number
	group?: string | number // If the payload item is part of a group
	states?: FuzzyMachine
	onclick?: (payload: FuzzyPayload) => void
	init?: (payload: FuzzyPayload) => void
}
