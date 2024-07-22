import {UiState, type UiBlockProps} from '$types/index.js'
import {
	type FuzzyPayload,
	type FuzzyState,
	type FuzzyMachine,
	type FuzzyTransitions,
} from '$types/machines.js'
import type {Snippet} from 'svelte'
import {type ButtonType, ButtonEvent} from '../button.types.js'

export type UiStateToggle = UiState.active | UiState.inactive

export type ToggleMachine = {
	active: FuzzyState
	inactive: FuzzyState
}

export const TOGGLE_MACHINE: ToggleMachine = {
	active: {
		id: UiState.active,
		state: UiState.active,
		event: ButtonEvent.toggle,
	},
	inactive: {
		id: UiState.inactive,
		state: UiState.inactive,
		event: ButtonEvent.toggle,
	},
}

export const TOGGLE_TRANSITIONS: FuzzyTransitions = {
	active: {
		toggle: UiState.inactive,
	},
	inactive: {
		toggle: UiState.active,
	},
}

/**
 * This component contains a button that will Toggle between these two states. Each state has its own text and asset (if any) and possible style according to its active / inactive state
 */
export type ToggleProps = UiBlockProps & {
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
	states?: FuzzyMachine
	onclick?: (payload: FuzzyPayload) => void
	init?: (payload: FuzzyPayload) => void
}
