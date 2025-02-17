export default {
	Button: {label: 'Button', asset: 'idea'},
	Expand: {
		title: 'Expand',
		states: {
			expanded: {
				id: 'button-expand',
				label: 'Expand',
				event: 'collapse',
				asset: 'point-down',
			},
			collapsed: {
				id: 'button-expand',
				label: 'Expand',
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
				label: 'Rabbit',
				event: 'switch',
				asset: 'switch-active',
			},
			inactive: {
				id: 'button-switch',
				label: 'Hat',
				event: 'switch',
				asset: 'switch-inactive',
			},
		},
	},
	InputCheck: {label: 'A checkbox choice'},
	InputRadio: {label: 'A radio choice'},
	InputRange: {label: 'A range of ordered choices'},
	Feedback: {
		status: [
			{
				text: 'Too swift arrives as tardy as too slow.',
				value: 'default',
				variant: 'outline',
				asset: 'default',
			},
			{
				text: `Though this be madness, yet there is method in't.`,
				value: 'info',
				variant: 'outline',
				asset: 'info',
			},
			{
				text: 'One touch of nature makes the whole world kin.',
				value: 'success',
				variant: 'outline',
				asset: 'success',
			},
			{
				text: 'The course of true love never did run smooth.',
				value: 'warning',
				variant: 'outline',
				asset: 'warning',
			},
			{
				text: ` There's small choice in rotten apples.`,
				value: 'error',
				variant: 'outline',
				asset: 'error',
			},
		],
	},
	Toggle: {label: 'Toggle', asset: 'favorite'},
	Fieldset: {
		items: ['Form input 1', 'Form input 2', 'Form input 3'],
	},
	Magic: {
		text: 'Abracadabra',
		spell: 'bleu',
		uno: 'magic',
		due: 'sparkles',
		size: 'md',
	},
}
