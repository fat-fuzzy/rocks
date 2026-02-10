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
	state?: string
	action?: (event: FuzzyEvent) => void // Callback function defined in the parent component
}

/**
 * Describes a component state instance
 */
export type FuzzyState = {
	id: string // Element id
	value?: string | number // Element value
	label: string // Element label
	asset?: string // Element icon: the `value` in emoji:value or svg:value
	variant?: string // Variant style for the element state
	state?: UiState // Name of the current state
	event?: string // Event that can be emitted from the current state
	action?: (payload: FuzzyPayload) => void // Action available on the current state
}

/**
 * Describes the  possible states of a component
 */
export type FuzzyMachine = Record<string, FuzzyState>

/**
 * Describes the transitions between states
 */
export type FuzzyTransitions = Record<string, Record<string, string>>

export interface FuzzyActor {
	state: string
	machine: FuzzyMachine
	transitions: FuzzyTransitions
	currentState: FuzzyState
	value?: string | number
	id: string
	label: string
}

export type FuzzyArgs<T> = {mode?: string; items: T[]}

export interface FuzzySystem<T> {
	mode?: string
	state: Map<string, FuzzyPayload>
	reset: () => void
	init: (args: FuzzyArgs<T>) => void
	buildStates?: (items: T[]) => Map<FuzzyEvent, FuzzyPayload>
	getStateItem?: (id: string) => T | undefined
	setStateItem?: (item: T) => void
	deleteStateItem?: (id: string) => void
	getState: (id?: string) => T[] | string | undefined
	setState: (payload: FuzzyPayload) => void
	update: (payload: FuzzyPayload) => void
}
