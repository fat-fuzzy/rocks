import ui from '@fat-fuzzy/ui'
const {APP_SETTINGS} = ui.constants

export const links = [{id: 'link-list.doc', slug: 'doc', title: 'Doc'}]

export default {
	ButtonMenu: {
		items: [
			{id: 'menu.button.vader', label: 'Vader', asset: 'vader'},
			{id: 'menu.button.ollie', label: 'Ollie', asset: 'ollie'},
			{id: 'menu.button.moby', label: 'Moby', asset: 'moby'},
		],
	},
	ToggleMenu: {
		items: [
			{id: 'menu.toggle.idea', label: 'Idea', asset: 'idea'},
			{id: 'menu.toggle.profile', label: 'Profile', asset: 'profile'},
			{id: 'menu.toggle.favorite', label: 'Favorite', asset: 'favorite'},
		],
	},
	RevealMenu: {
		items: [
			{id: 'reveal-menu.button.idea', label: 'Idea', asset: 'idea'},
			{id: 'reveal-menu.button.profile', label: 'Profile', asset: 'profile'},
			{id: 'reveal-menu.button.favorite', label: 'Favorite', asset: 'favorite'},
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
	LinkTree: {
		items: links,
	},
	Nav: {
		title: 'Nav',
		items: [
			{id: 'link-list.home', slug: '', title: 'Home'},
			{id: 'link-list.doc', slug: 'doc', title: 'Doc'},
		],
	},
	DetailsNav: {
		slug: 'ui',
		title: 'DetailsNav',
		items: links,
	},
	RevealNav: {
		place: 'top',
		items: [
			{
				slug: 'recipes',
				title: 'Recipes',
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
	SignUp: {
		title: 'SignUp',
		validationFunction: 'SignUpValidationFunction',
		dataPrefix: 'sample',
		inputs: ['email', 'password'],
	},
	Header: {
		slug: 'ui',
		title: 'Header',
		id: 'Header-nav',
		formaction: 'updateState',
		items: {
			links,
			settings: APP_SETTINGS,
		},
		app: {
			settings: {brightness: 'day', contrast: 'blend'},
		},
	},
}
