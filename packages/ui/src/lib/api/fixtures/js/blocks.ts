export default {
	Button: {id: 'idea', text: 'Idea', asset: '💡'},
	ButtonMenu: {
		items: [
			{id: 'vader', text: 'Vader', asset: '👾'},
			{id: 'ollie', text: 'Ollie', asset: '🐙'},
			{id: 'moby', text: 'Moby', asset: '🐳'},
		],
	},
	Feedback: {
		text: 'All tests passed',
		context: 'code',
		variant: 'success',
	},
	Toggle: {id: 'favorite', text: 'Favorite', asset: '❤️'},
	ToggleMenu: {
		items: [
			{id: 'idea', text: 'Idea', asset: '💡'},
			{id: 'profile', text: 'Profile', asset: '🦁'},
			{id: 'favorite', text: 'Favorite', asset: '❤️'},
		],
	},
	RadioGroup: [
		{id: 'radio-1', label: 'Radio 1'},
		{id: 'radio-2', label: 'Radio 2'},
		{id: 'radio-3', label: 'Radio 3'},
	],
	CheckboxGroup: [
		{id: 'check-1', label: 'Checkbox 1'},
		{id: 'check-2', label: 'Checkbox 2'},
		{id: 'check-3', label: 'Checkbox 3'},
	],
	Nav: [
		{slug: '', title: 'Home'},
		{slug: 'about', title: 'About'},
	],
	RevealNav: [
		{
			slug: 'ui',
			title: 'RevealNav Example',
			items: [
				{
					slug: 'blocks',
					title: 'Block',
					items: [
						{slug: 'nav', title: 'Nav'},
						{slug: 'reveal-nav', title: 'RevealNav'},
					],
				},
				{
					slug: 'layouts',
					title: 'Layouts',
					items: [
						{slug: 'burrito', title: 'Burrito'},
						{slug: 'stack', title: 'Stack'},
					],
				},
			],
		},
	],
}
