import type {AriaInvoke} from '$types'

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
			invoke: 'auto' as AriaInvoke,
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
			fixed: 'true',
			place: 'top',
			asset: 'cookie',
			layer: '1',
			invoke: 'auto' as AriaInvoke,
			onbeforetoggle: () => {
				console.log('Popover onbeforetoggle')
			},
		},
		expected: {content: 'Popover Content 2'},
	},
]

export {POPOVER_PROPS}
