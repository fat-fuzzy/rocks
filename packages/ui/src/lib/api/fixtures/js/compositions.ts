export default {
	ButtonMenu: {
		items: [
			{id: 'vader', text: 'Vader', asset: 'emoji:vader'},
			{id: 'ollie', text: 'Ollie', asset: 'emoji:ollie'},
			{id: 'moby', text: 'Moby', asset: 'emoji:moby'},
		],
	},
	ToggleMenu: {
		items: [
			{id: 'idea', text: 'Idea', asset: 'emoji:idea'},
			{id: 'profile', text: 'Profile', asset: 'emoji:profile'},
			{id: 'favorite', text: 'Favorite', asset: 'emoji:favorite'},
		],
	},
	RevealMenu: {
		slug: 'ui',
		title: 'RevealMenu',
		items: [
			{id: 'idea', text: 'Idea', asset: 'emoji:idea'},
			{id: 'profile', text: 'Profile', asset: 'emoji:profile'},
			{id: 'favorite', text: 'Favorite', asset: 'emoji:favorite'},
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
	LinkList: {
		items: [
			{id: 'home', slug: '', title: 'Home'},
			{id: 'about', slug: 'about', title: 'About'},
		],
	},
	Nav: {
		items: [
			{id: 'home', slug: '', title: 'Home', asset: 'emoji:home'},
			{id: 'about', slug: 'about', title: 'About', asset: 'emoji:about'},
		],
	},
	DetailsNav: {
		slug: 'ui',
		title: 'DetailsNav',
		items: [
			{id: 'home', slug: '', title: 'Home'},
			{id: 'about', slug: 'about', title: 'About'},
		],
	},
	RevealNav: {
		slug: 'ui',
		title: 'RevealNav',
		items: [
			{
				slug: 'compositions',
				title: 'Compositions',
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
}
