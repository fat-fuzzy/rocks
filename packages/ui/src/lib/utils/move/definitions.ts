import type {FuzzyTransitions} from '$types'
import type {MoveMachine} from './move.d.ts' // TODO move to types
import {UiState, MoveEvent} from '$types'

export const IGNORE_TAGS: {[key: string]: boolean} = {
	textarea: true,
	input: true,
	select: true,
	button: true,
}

export const MOVE_MACHINE: MoveMachine = {
	inactive: {
		id: UiState.inactive,
		state: UiState.inactive,
		event: MoveEvent.movestart,
		label: 'Move',
	},
	active: {
		id: UiState.active,
		state: UiState.active,
		event: [MoveEvent.move, MoveEvent.moveend],
	},
}

export const MOVE_TRANSITIONS: FuzzyTransitions = {
	inactive: {
		movestart: UiState.active,
	},
	active: {
		move: UiState.active,
		moveend: UiState.inactive,
	},
}
