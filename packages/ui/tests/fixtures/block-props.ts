import type {AriaInvoke} from '$types'

import {EXPAND_MACHINE} from '$lib/components/blocks/buttons/Expand/definitions'

const EXPAND_PROPS = [
	{
		props: {
			id: 'expand-1',
			name: 'expand-1',
			controls: 'expand-content-1',
			states: EXPAND_MACHINE,
			action: () => {},
			event: 'expand',
		},
	},
	{
		props: {
			id: 'expand-2',
			name: 'expand-2',
			controls: 'expand-content-2',
			states: EXPAND_MACHINE,
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

export {EXPAND_PROPS, POPOVER_PROPS}
