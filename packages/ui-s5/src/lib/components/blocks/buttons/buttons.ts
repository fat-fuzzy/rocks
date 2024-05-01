import type {Snippet} from 'svelte'
import type {
	ButtonType,
	ButtonPayload,
	ButtonStates,
	StateSwitch,
	UiState,
	UiStyleProps,
} from '$types'

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
	onclick?: (payload: ButtonPayload) => void
}

export type ToggleProps = ButtonProps & {
	initial?: UiState
}

export type SwitchProps = ToggleProps & {
	states: ButtonStates // this component contains a button that will Switch between these two states. Each state has its own text and asset (if any) and possible style according to its active / inactive state
}

export type ExpandProps = ToggleProps & {
	controls: string // id of the DOM element that is controlled by this button
	states: StateSwitch // this component contains a button that will Expand the DOM element it controls when active, or minimize it when inactive. Each state can have its own text, style, and asset (if any) according to its active / inactive state
}
