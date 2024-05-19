import type {Snippet} from 'svelte'
import type {InputPayload, UiState, UiStyleProps} from '$types/index.js'

export type ButtonType = 'button' | 'submit' | 'reset' | null | undefined

export type TogglePayload = InputPayload & {
	text?: string
	pressed: boolean
}

export type ButtonProps = UiStyleProps & {
	/**
	 * State props
	 */
	id: string // Use for machine id
	name: string
	title?: string
	value?: string
	disabled?: boolean
	formaction?: string

	type?: ButtonType
	children?: Snippet
	onclick?: (payload: InputPayload) => void
}

export type ToggleProps = ButtonProps & {
	initial?: UiState
	onclick?: (payload: TogglePayload) => void
}

export type ExpandProps = ToggleProps & {
	controls: string // id of the DOM element that is controlled by this button
	states: StateSwitch // this component contains a button that will Expand the DOM element it controls when active, or minimize it when inactive. Each state can have its own text, style, and asset (if any) according to its active / inactive state
	onclick?: (payload: TogglePayload) => void
}
