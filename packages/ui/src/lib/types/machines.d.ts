/**
 * Fuzzy State Machine
 */
import type {UiState} from '$types'

export type FuzzyEvent = boolean | number | string | Event

export type FuzzyPayload = {
	id: string
	name: string
	value?: string | number
	group?: string | number // If the payload item is part of a group
	state: string
	action?: (event: FuzzyEvent) => void // Callback function defined in the parent component
}

/**
 * Describes the state of a component
 */
export type FuzzyState = {
	id: string // Element id
	value?: string | number // Element value
	label?: string // Element label
	asset?: string // Element icon: the `value` in emoji:value or svg:value
	variant?: string // Variant style for the element state
	state?: UiState | string // Name of the current state
	event?: string // Event that can be emitted from the current state
	action?: (payload: FuzzyPayload) => void // Action available on the current state
}

/**
 * Describes the state of a component
 */
export type FuzzyMachine = {
	[state in UiState]?: FuzzyState
}

/**
 * Describes the transitions between states
 */
export type FuzzyTransitions = {
	[state: string]: {
		[event: string]: UiState
	}
}

export interface FuzzyActor {
	state: UiState
	machine: FuzzyMachine
	transitions: FuzzyTransitions
	currentState: FuzzyState
	value?: string | number
	id: string
	label: string
}

export interface FuzzySystem {
	state: Map<string, FuzzyPayload>
}
