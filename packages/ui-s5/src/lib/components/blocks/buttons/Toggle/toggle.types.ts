import {UiState, type ButtonEventType} from '$types/index.js'
import type {ButtonProps} from '../button.types.js'

export type ToggleState = UiState.active | UiState.inactive

export type TogglePayload = {
	id: string
	name: string
	value?: string | number
	text?: string
	pressed: boolean
	update?: (event: ButtonEventType) => void
}

export type ToggleProps = ButtonProps & {
	text?: string
	initial?: ToggleState
	states?: ToggleStateType // this component contains a button that will Toggle between these two states. Each state has its own text and asset (if any) and possible style according to its active / inactive state
	onclick?: (payload: TogglePayload) => void
}

export type ToggleType = {
	id: string
	value: string | number
	text?: string
	asset?: string
	variant?: string
	pressed: boolean
	onclick?: (payload: TogglePayload) => void
}

export type ToggleStateType = {
	[state in ToggleState]: ToggleType
}

export type ToggleTransitionsType = {
	[state in ToggleState]: {
		[event in ButtonEventType]?: UiState
	}
}

export const TOGGLE: ToggleStateType = {
	active: {
		id: 'active',
		value: 'active',
		pressed: true,
	},
	inactive: {
		id: 'inactive',
		value: 'inactive',
		pressed: false,
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
