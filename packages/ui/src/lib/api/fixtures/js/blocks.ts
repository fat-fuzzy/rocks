export default {
	Button: {id: 'idea', text: 'Idea', asset: 'emoji:idea'},
	Feedback: {
		useCases: [
			{
				text: 'Too swift arrives as tardy as too slow.',
				case: 'default',
				variant: 'outline',
				asset: 'emoji',
			},
			{
				text: `Though this be madness, yet there is method in't.`,
				case: 'info',
				variant: 'outline',
				asset: 'emoji',
			},
			{
				text: 'One touch of nature makes the whole world kin.',
				case: 'success',
				variant: 'outline',
				asset: 'emoji',
			},
			{
				text: 'The course of true love never did run smooth.',
				case: 'warning',
				variant: 'outline',
				asset: 'emoji',
			},
			{
				text: ` There's small choice in rotten apples.`,
				case: 'error',
				variant: 'outline',
				asset: 'emoji',
			},
		],
	},
	Toggle: {id: 'favorite', text: 'Favorite', asset: 'emoji:favorite'},
	Fieldset: {
		items: ['Form input 1', 'Form input 2', 'Form input 3'],
	},
}
