export default {
	ButtonMenu: {
		items: [
			{id: 'vader', text: 'Vader', asset: '👾'},
			{id: 'ollie', text: 'Ollie', asset: '🐙'},
			{id: 'moby', text: 'Moby', asset: '🐳'},
		],
	},
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
	Nav: {
		items: [
			{slug: '', title: 'Home', asset: '🥚'},
			{slug: 'about', title: 'About', asset: '🐥'},
		],
	},
	DetailsNav: {
		items: [
			{
				slug: 'ui',
				title: 'DetailsNav Example',
				items: [
					{slug: '', title: 'Home', asset: '🥚'},
					{slug: 'about', title: 'About', asset: '🐥'},
				],
			},
		],
	},
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
