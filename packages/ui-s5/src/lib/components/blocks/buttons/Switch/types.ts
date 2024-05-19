import type {UiState, ButtonEventType} from '$types/index.js'
import type {ToggleProps, TogglePayload} from '../button.types.js'

export type SwitchProps = ToggleProps & {
	states: SwitchStateType // this component contains a button that will Switch between these two states. Each state has its own text and asset (if any) and possible style according to its active / inactive state
}

export type SwitchType = {
	id: string
	value: string
	text?: string
	asset?: string
	variant?: string
	onclick?: (payload: TogglePayload) => void
}

export type SwitchStateType = {
	[state in UiState]: SwitchType
}

export type SwitchTransitionsType = {
	[state in UiState]: {
		[event in ButtonEventType]?: UiState
	}
}

export const SWITCH: SwitchStateType = {
	active: {
		id: 'active',
		value: 'active',
		text: 'Active',
		asset: 'emoji:bunny',
		variant: 'fill',
	},
	inactive: {
		id: 'inactive',
		value: 'inactive',
		text: 'Inactive',
		asset: 'emoji:hat',
		variant: 'fill',
	},
}

export const SWITCH_TRANSITIONS: SwitchTransitionsType = {
	active: {
		switch: 'inactive' as UiState,
	},
	inactive: {
		switch: 'active' as UiState,
	},
}
