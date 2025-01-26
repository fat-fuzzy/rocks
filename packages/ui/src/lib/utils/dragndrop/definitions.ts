import type {FuzzyTransitions} from '$types'
import type {DndMachine} from './dnd.d.ts' // TODO move to types
import {UiState, MoveEvent, UiEffect} from '$types'

export const DND_MACHINE: DndMachine = {
	inactive: {
		id: UiState.inactive,
		state: UiState.inactive,
		event: MoveEvent.dragstart,
		label: 'Drag me',
	},
	active: {
		id: UiState.active,
		state: UiState.active,
		event: MoveEvent.drag,
		effect: UiEffect,
		label: '[dragging]',
	},
	hovering: {
		id: UiState.hovering,
		state: UiState.hovering,
		event: MoveEvent.dragend,
		effect: UiEffect,
		label: 'Drop here',
	},
}

export const DND_TRANSITIONS: FuzzyTransitions = {
	inactive: {
		dragstart: UiState.hovering,
	},
	active: {
		drag: UiState.active,
	},
	hovering: {
		dragend: UiState.inactive,
	},
}
