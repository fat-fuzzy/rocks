import type {UiState, ButtonEventType, InputPayload} from '$types/index.js'
import type {ButtonProps} from '$lib/components/blocks/buttons/button.types.js'

export type ExpandState = UiState.expanded | UiState.collapsed

export type ExpandPayload = InputPayload & {
	text?: string
	expanded: boolean
	update: (event: ButtonEventType) => void
}

export type ExpandProps = ButtonProps & {
	initial?: ExpandState
	controls: string // id of the DOM element that is controlled by this button
	states: ExpandStateType // this component contains a button that will Expand the DOM element it controls when expanded, or minimize it when collapsed. Each state can have its own text, style, and asset (if any) according to its expanded / collapsed state
	onclick?: (payload: ExpandPayload) => void
}
export type ExpandType = {
	id: string
	value: string
	text?: string
	asset?: string
	variant?: string
	onclick?: (payload: ExpandPayload) => void
}

export type ExpandStateType = {
	[state in ExpandState]: ExpandType
}

export type ExpandTransitionsType = {
	[state in ExpandState]: {
		[event in ButtonEventType]?: ExpandState
	}
}

export const EXPAND: ExpandStateType = {
	expanded: {
		id: 'expanded',
		value: 'expanded',
		text: 'Active',
		asset: 'emoji:bunny',
		variant: 'fill',
	},
	collapsed: {
		id: 'collapsed',
		value: 'collapsed',
		text: 'Expand',
		asset: 'emoji:hat',
		variant: 'fill',
	},
}

export const EXPAND_TRANSITIONS: ExpandTransitionsType = {
	expanded: {
		expand: 'collapsed' as ExpandState,
	},
	collapsed: {
		expand: 'expanded' as ExpandState,
	},
}
