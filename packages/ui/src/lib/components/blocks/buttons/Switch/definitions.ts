import type {FuzzyTransitions, SwitchMachine} from '$types'

export const SWITCH_MACHINE: SwitchMachine = {
	active: {
		id: 'active',
		state: 'active',
		event: 'switch',
		label: 'Active',
	},
	inactive: {
		id: 'inactive',
		state: 'inactive',
		event: 'switch',
		label: 'Inactive',
	},
}

export const SWITCH_TRANSITIONS: FuzzyTransitions = {
	active: {
		switch: 'inactive',
	},
	inactive: {
		switch: 'active',
	},
}
