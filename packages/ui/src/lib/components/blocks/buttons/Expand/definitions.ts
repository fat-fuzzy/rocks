import type {FuzzyTransitions, ExpandMachine} from '$types'

export const EXPAND_MACHINE: ExpandMachine = {
	expanded: {
		id: 'expanded',
		state: 'expanded',
		event: 'collapse',
		label: 'Collapse',
	},
	collapsed: {
		id: 'collapsed',
		state: 'collapsed',
		event: 'expand',
		label: 'Expand',
	},
}

export const EXPAND_TRANSITIONS: FuzzyTransitions = {
	expanded: {
		collapse: 'collapsed',
	},
	collapsed: {
		expand: 'expanded',
	},
}
