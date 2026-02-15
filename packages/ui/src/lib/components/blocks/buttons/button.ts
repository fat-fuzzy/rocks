import type {Snippet} from 'svelte'
import type {FuzzyPayload, UiBlockProps, UiState} from '$types'

export type ButtonType = 'button' | 'submit' | 'reset' | null | undefined

export type ButtonProps = UiBlockProps & {
	/**
	 * State props
	 */
	id: string
	name: string
	label?: string
	title?: string
	value?: string | number
	disabled?: boolean
	popovertarget?: string
	formaction?: string

	type?: ButtonType
	children?: Snippet
	onclick?: (payload: FuzzyPayload) => void
}

/**
 * This component contains a button that will Toggle between two states. Each state has its own text and optional asset and style according to its active / inactive state
 */
export type ButtonStateProps = UiBlockProps & {
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
	initial?: UiState // Initial state of the button
	value?: string | number
	group?: string | number // If the payload item is part of a group
	onclick?: (payload: FuzzyPayload) => void
	init?: (payload: FuzzyPayload) => void
}
