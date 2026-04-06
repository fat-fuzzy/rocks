import ui from '@fat-fuzzy/ui'
const {APP_SETTINGS} = ui.constants

export const links = [{id: 'link-list.doc', slug: 'doc', label: 'Doc'}]

export default {
	ButtonMenu: {
		items: [
			{
				id: 'menu.button.vader',
				name: 'menu.button.vader',
				label: 'Vader',
				asset: 'vader',
			},
			{
				id: 'menu.button.ollie',
				name: 'menu.button.ollie',
				label: 'Ollie',
				asset: 'ollie',
			},
			{
				id: 'menu.button.moby',
				name: 'menu.button.moby',
				label: 'Moby',
				asset: 'moby',
			},
		],
	},
	ToggleMenu: {
		items: [
			{
				id: 'menu.toggle.idea',
				name: 'menu.toggle.idea',
				label: 'Idea',
				asset: 'idea',
			},
			{
				id: 'menu.toggle.profile',
				name: 'menu.toggle.profile',
				label: 'Profile',
				asset: 'profile',
			},
			{
				id: 'menu.toggle.favorite',
				name: 'menu.toggle.favorite',
				label: 'Favorite',
				asset: 'favorite',
			},
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
			{id: 'link-list.home', slug: '', label: 'Home'},
			{id: 'link-list.doc', slug: 'doc', label: 'Doc'},
		],
	},
	DetailsNav: {
		slug: 'ui',
		title: 'DetailsNav',
		items: links,
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
