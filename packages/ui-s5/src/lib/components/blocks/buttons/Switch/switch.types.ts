import type {ButtonEventType} from '$types/index.js'
import type {
	ToggleState,
	ToggleProps,
	ToggleType,
} from '$lib/components/blocks/buttons/Toggle/toggle.types.js'

export type SwitchProps = ToggleProps & {
	states: SwitchStateType // this component contains a button that will Switch between these two states. Each state has its own text and asset (if any) and possible style according to its active / inactive state
}

export type SwitchType = ToggleType

export type SwitchStateType = {
	[state in ToggleState]: SwitchType
}

export type SwitchTransitionsType = {
	[state in ToggleState]: {
		[event in ButtonEventType]?: ToggleState
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
		switch: 'inactive' as ToggleState,
	},
	inactive: {
		switch: 'active' as ToggleState,
	},
}
