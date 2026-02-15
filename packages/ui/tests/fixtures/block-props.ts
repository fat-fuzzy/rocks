import type {AriaInvoke} from '$types'

import {TOGGLE_MACHINE} from '$lib/components/blocks/buttons/Toggle/definitions'
import {EXPAND_MACHINE} from '$lib/components/blocks/buttons/Expand/definitions'

const TOGGLE_PROPS = [
	{
		props: {
			id: 'toggle-1',
			name: 'toggle-1',
			initial: 'inactive',
			states: TOGGLE_MACHINE,
			action: () => {},
			event: 'toggle',
		},
		expected: {
			selected: {
				id: 'toggle-1',
				name: 'toggle-1',
				state: 'active',
				action: () => {},
			},
		},
	},
	{
		props: {
			id: 'toggle-2',
			name: 'toggle-2',
			initial: 'active',
			states: TOGGLE_MACHINE,
			action: () => {},
		},
		expected: {
			selected: {
				id: 'toggle-2',
				name: 'toggle-2',
				state: 'active',
			},
		},
	},
	{
		props: {
			id: 'toggle-3',
			name: 'toggle-3',
			initial: 'inactive',
			states: TOGGLE_MACHINE,
		},
	},
]

const TOGGLE_GROUP_PROPS = [
	{
		props: {
			id: 'toggle-1',
			name: 'toggle-1',
			group: 'group-1',
			state: 'inactive',
			states: TOGGLE_MACHINE,
			action: () => {},
			event: 'toggle',
		},
		expected: {
			state: {
				group: 'group-1',
				id: 'toggle-1',
				label: undefined,
				name: 'toggle-1',
				title: '',
				value: 'toggle-1',
			},
		},
	},
	{
		props: {
			id: 'toggle-2',
			name: 'toggle-2',
			group: 'group-1',
			state: 'active',
			action: () => {},
			states: TOGGLE_MACHINE,
		},
		expected: {
			state: {
				group: 'group-1',
				id: 'toggle-2',
				label: undefined,
				name: 'toggle-2',
				title: '',
				value: 'toggle-2',
			},
		},
	},
	{
		props: {
			id: 'toggle-3',
			name: 'toggle-3',
			group: 'group-1',
			states: TOGGLE_MACHINE,
			action: () => {},
			event: 'toggle',
		},
	},
	{
		props: {
			id: 'toggle-4',
			name: 'toggle-4',
			initial: 'active',
			action: () => {},
			states: TOGGLE_MACHINE,
		},
		expected: {
			state: {
				id: 'toggle-4',
				name: 'toggle-4',
				group: 'default',
			},
		},
	},
	{
		props: {
			id: 'toggle-5',
			name: 'toggle-5',
			value: 'inactive',
			states: TOGGLE_MACHINE,
			action: () => {},
			event: 'toggle',
		},
	},
	{
		props: {
			id: 'toggle-6',
			name: 'toggle-6',
			value: 'inactive',
			action: () => {},
			states: TOGGLE_MACHINE,
		},
	},
]

const TOGGLE_CHANGE_PROPS = [
	{
		props: {
			id: 'toggle-1',
			name: 'toggle-1',
			states: EXPAND_MACHINE,
			state: 'inactive',
			onclick: () => {},
		},
	},
]

const EXPAND_PROPS = [
	{
		props: {
			id: 'expand-1',
			name: 'expand-1',
			controls: 'expand-content-1',
			state: 'collapsed',
			value: 'value-1',
			states: EXPAND_MACHINE,
			action: () => {},
			event: 'expand',
		},
	},
	{
		props: {
			id: 'expand-2',
			name: 'expand-2',
			state: 'collapsed',
			value: 'value-2',
			controls: 'expand-content-2',
			states: EXPAND_MACHINE,
		},
	},
]

const EXPAND_CHANGE_PROPS = [
	{
		props: {
			id: 'expand-1',
			name: 'expand-1',
			controls: 'expand-content-1',
			states: EXPAND_MACHINE,
			state: 'expanded',
			action: () => {},
		},
	},
]

const POPOVER_PROPS = [
	{
		props: {
			id: 'test-popover-1',
			role: 'dialog',
			title: 'Test Popover 1',
			fixed: 'true',
			place: 'bottom',
			asset: 'cookie',
			layer: '1',
			invoke: 'auto' as AriaInvoke, // will light dismiss
			onbeforetoggle: () => {
				console.log('Popover onbeforetoggle')
			},
		},
		expected: {content: 'Popover Content 1'},
	},
	{
		props: {
			id: 'test-popover-2',
			role: 'dialog',
			title: 'Test Popover 2',
			place: 'top',
			asset: 'cookie',
			invoke: 'manual' as AriaInvoke, // won't light dismiss
		},
		expected: {content: 'Popover Content 2'},
	},
]

export {
	TOGGLE_PROPS,
	TOGGLE_GROUP_PROPS,
	TOGGLE_CHANGE_PROPS,
	EXPAND_PROPS,
	EXPAND_CHANGE_PROPS,
	POPOVER_PROPS,
}
