import {type FuzzyState, type FuzzyTransitions} from '$types/machines.js'
import type {ToggleProps} from '../Toggle/toggle.types.js'
import {UiState} from '$types/index.js'
import {ButtonEvent} from '../button.types.js'

export type UiStateExpand = UiState.expanded | UiState.collapsed

export type ExpandMachine = {
	expanded: FuzzyState
	collapsed: FuzzyState
}

export const EXPAND_MACHINE: ExpandMachine = {
	expanded: {
		id: UiState.expanded,
		state: UiState.expanded,
		event: ButtonEvent.collapse,
		text: 'Collapse',
		asset: 'point-down',
	},
	collapsed: {
		id: UiState.collapsed,
		state: UiState.collapsed,
		event: ButtonEvent.expand,
		text: 'Expand',
		asset: 'point-right',
	},
}

export const EXPAND_TRANSITIONS: FuzzyTransitions = {
	expanded: {
		collapse: UiState.collapsed,
	},
	collapsed: {
		expand: UiState.expanded,
	},
}

/**
 * This component contains a button that will Switch between these two states. Each state has its own text and asset (if any) and possible style according to its active / inactive state
 */
export type ExpandProps = ToggleProps & {
	controls: string
	states?: ExpandMachine
}
