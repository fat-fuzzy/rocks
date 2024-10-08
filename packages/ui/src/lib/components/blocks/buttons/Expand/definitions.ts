import type {FuzzyTransitions, ExpandMachine} from '$types'
import {UiState, ButtonEvent} from '$types'

export const EXPAND_MACHINE: ExpandMachine = {
	expanded: {
		id: UiState.expanded,
		state: UiState.expanded,
		event: ButtonEvent.collapse,
		label: 'Collapse',
	},
	collapsed: {
		id: UiState.collapsed,
		state: UiState.collapsed,
		event: ButtonEvent.expand,
		label: 'Expand',
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
