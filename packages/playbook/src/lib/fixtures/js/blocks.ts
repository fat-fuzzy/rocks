export default {
	Button: {id: 'button', text: 'Button', asset: 'idea'},
	Expand: {
		title: 'Expand',
		states: {
			expanded: {
				id: 'button-expand',
				text: 'Expand',
				event: 'collapse',
				asset: 'point-down',
			},
			collapsed: {
				id: 'button-expand',
				text: 'Expand',
				event: 'expand',
				asset: 'point-right',
			},
		},
	},
	Switch: {
		title: 'Switch',
		shape: 'round',
		states: {
			active: {
				id: 'button-switch',
				text: 'Rabbit',
				event: 'switch',
				asset: 'switch-active',
			},
			inactive: {
				id: 'button-switch',
				text: 'Hat',
				event: 'switch',
				asset: 'switch-inactive',
			},
		},
	},
	InputCheck: {id: 'check', text: 'An optional choice choice'},
	InputRadio: {id: 'radio', text: 'A mandatory choice'},
	InputRange: {id: 'range', text: 'A range of ordered choices'},
	Feedback: {
		status: [
			{
				text: 'Too swift arrives as tardy as too slow.',
				case: 'default',
				variant: 'outline',
				asset: 'default',
			},
			{
				text: `Though this be madness, yet there is method in't.`,
				case: 'info',
				variant: 'outline',
				asset: 'info',
			},
			{
				text: 'One touch of nature makes the whole world kin.',
				case: 'success',
				variant: 'outline',
				asset: 'success',
			},
			{
				text: 'The course of true love never did run smooth.',
				case: 'warning',
				variant: 'outline',
				asset: 'warning',
			},
			{
				text: ` There's small choice in rotten apples.`,
				case: 'error',
				variant: 'outline',
				asset: 'error',
			},
		],
	},
	Toggle: {id: 'button-toggle', text: 'Toggle', asset: 'favorite'},
	Fieldset: {
		items: ['Form input 1', 'Form input 2', 'Form input 3'],
	},
}
