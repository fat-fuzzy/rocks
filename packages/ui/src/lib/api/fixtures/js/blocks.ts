export default {
	Button: {id: 'idea', text: 'Idea', asset: 'emoji:idea'},
	InputCheck: {id: 'check', text: 'An optional choice choice'},
	InputRadio: {id: 'radio', text: 'A mandatory choice'},
	Feedback: {
		useCases: [
			{
				text: 'Too swift arrives as tardy as too slow.',
				case: 'default',
				variant: 'outline',
				asset: 'emoji:default',
			},
			{
				text: `Though this be madness, yet there is method in't.`,
				case: 'info',
				variant: 'outline',
				asset: 'emoji:info',
			},
			{
				text: 'One touch of nature makes the whole world kin.',
				case: 'success',
				variant: 'outline',
				asset: 'emoji:success',
			},
			{
				text: 'The course of true love never did run smooth.',
				case: 'warning',
				variant: 'outline',
				asset: 'emoji:warning',
			},
			{
				text: ` There's small choice in rotten apples.`,
				case: 'error',
				variant: 'outline',
				asset: 'emoji:error',
			},
		],
	},
	Toggle: {id: 'favorite', text: 'Favorite', asset: 'emoji:favorite'},
	Fieldset: {
		items: ['Form input 1', 'Form input 2', 'Form input 3'],
	},
}
