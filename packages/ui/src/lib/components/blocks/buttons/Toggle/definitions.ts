import type {FuzzyTransitions, ToggleMachine} from '$types'

export const TOGGLE_MACHINE: ToggleMachine = {
	active: {
		id: 'active',
		state: 'active',
		event: 'toggle',
		label: 'Active',
	},
	inactive: {
		id: 'inactive',
		state: 'inactive',
		event: 'toggle',
		label: 'Inactive',
	},
}

export const TOGGLE_TRANSITIONS: FuzzyTransitions = {
	active: {
		toggle: 'inactive',
	},
	inactive: {
		toggle: 'active',
	},
}
