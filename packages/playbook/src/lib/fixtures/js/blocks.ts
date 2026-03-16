export default {
	Button: {label: 'Button', asset: 'idea', justify: 'start'},
	Expand: {
		title: 'Expand',
		justify: 'start',
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
		justify: 'start',
		states: {
			active: {
				id: 'button-switch',
				label: 'Rabbit',
				event: 'switch',
			},
			inactive: {
				id: 'button-switch',
				label: 'Hat',
				event: 'switch',
			},
		},
	},
	Toggle: {
		title: 'Toggle',
		shape: 'round',
		justify: 'start',
		states: {
			active: {
				id: 'button-toggle',
				label: 'Toggle In',
				event: 'toggle',
			},
			inactive: {
				id: 'button-toggle',
				label: 'Toggle Out',
				event: 'toggle',
			},
		},
	},
	InputCheck: {label: 'A checkbox choice'},
	InputRadio: {label: 'A radio choice'},
	InputGroup: {
		legend: 'InputGroup',
		// type: 'radio',
		type: 'checkbox',
		title: 'InputGroup',
		name: 'input-group',
		value: 'input-group',
		variant: 'outline',
		items: [
			{label: 'Checkbox 1', id: 'input-group.check-1', value: 'check-1'},
			{label: 'Checkbox 2', id: 'input-group.check-2', value: 'check-2'},
			{label: 'Checkbox 3', id: 'input-group.check-3', value: 'check-3'},
			{label: 'Checkbox 4', id: 'input-group.check-4', value: 'check-4'},
			{label: 'Checkbox 5', id: 'input-group.check-5', value: 'check-5'},
			{label: 'Checkbox 6', id: 'input-group.check-6', value: 'check-6'},
		],
	},
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
