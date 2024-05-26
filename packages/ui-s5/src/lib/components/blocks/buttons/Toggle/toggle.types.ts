import {UiState, type ButtonEventType, type UiStyleProps} from '$types/index.js'
import type {Snippet} from 'svelte'
import type {ButtonType} from '../button.types.js'

export type ToggleState = UiState.active | UiState.inactive

export type TogglePayload = {
	id: string
	name: string
	value: string | number
	text?: string
	state: string
	update?: (event: ButtonEventType) => void
}

export type ToggleProps = UiStyleProps & {
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
	value: string | number
	states?: ToggleStateType // this component contains a button that will Toggle between these two states. Each state has its own text and asset (if any) and possible style according to its active / inactive state
	onclick?: (payload: TogglePayload) => void
	onload?: (payload: TogglePayload) => void
}

export type ToggleType = {
	id: string
	value?: string | number
	text?: string
	asset?: string
	variant?: string
	state?: string
	onclick?: (payload: TogglePayload) => void
}

export type ToggleStateType = {
	[state in ToggleState as string]: ToggleType
}

export type ToggleTransitionsType = {
	[state in ToggleState as string]: {
		[event in ButtonEventType]?: UiState
	}
}

export const TOGGLE: ToggleStateType = {
	active: {
		id: 'active',
		state: 'active',
	},
	inactive: {
		id: 'inactive',
		state: 'inactive',
	},
}

export const TOGGLE_TRANSITIONS: ToggleTransitionsType = {
	active: {
		toggle: 'inactive' as UiState,
	},
	inactive: {
		toggle: 'active' as UiState,
	},
}
