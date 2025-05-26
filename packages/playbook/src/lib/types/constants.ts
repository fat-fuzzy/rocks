import type {Settings, StyleTree, Meta} from '$types'

const DEFAULT_REVEAL_STATE: Settings = {reveal: 'minimize'}

const DEFAULT_NAV_REVEAL_STATE: Settings = {reveal: 'expanded'}

const DEFAULT_DS_STATE: {
	Reveal: Settings
	RevealMenu: Settings
	RevealNav: Settings
	HeaderRevealNav: Settings
	HeaderRevealContext: Settings
} = {
	Reveal: {reveal: 'collapsed'},
	RevealMenu: {reveal: 'collapsed'},
	RevealNav: {reveal: 'collapsed'},
	HeaderRevealNav: {reveal: 'collapsed'},
	HeaderRevealContext: {reveal: 'collapsed'},
}

const TRANSITION_REVEAL: {[key: string]: string} = {
	expanded: 'collapsed',
	collapsed: 'expanded',
}

const NUMBER_TO_SIZE: {[key: string]: string} = {
	// TODO: figure out a better way to map range number values to class strings
	'0': 'xs',
	'25': 'sm',
	'50': 'md',
	'75': 'lg',
	'100': 'xl',
}

const DEFAULT_STYLES: StyleTree = {
	tokens: {
		families: {
			element: {color: 'primary', typography: 'h1'},
		},
	},
	app: {
		families: {
			settings: {
				brightness: 'day',
				contrast: 'blend',
			},
		},
	},
	blocks: {
		families: {
			element: {
				variant: 'fill',
				color: '',
				status: 'default',
				context: 'form',
				asset: 'emoji:default',
				size: 'md',
				shape: 'none',
			},
		},
	},
	layouts: {
		families: {
			container: {container: 'taco', size: 'md'},
		},
	},
}

const DEFAULT_META: Meta = {
	title: '',
	slug: '',
	status: '',
	props_state: [],
	content_types: [],
	context: ['app.settings'],
}

const TABS = [
	{
		slug: 'doc',
		title: 'Doc',
		initial: true,
		variant: 'link',
		color: 'primary',
		size: 'xs',
		shape: 'round',
		asset: 'doc',
	},
	{
		slug: 'playbook',
		title: 'Playbook',
		initial: false,
		variant: 'link',
		color: 'accent',
		size: 'xs',
		shape: 'round',
		asset: 'playbook',
	},
]
export default {
	DEFAULT_STYLES,
	DEFAULT_REVEAL_STATE,
	DEFAULT_NAV_REVEAL_STATE,
	DEFAULT_DS_STATE,
	TRANSITION_REVEAL,
	NUMBER_TO_SIZE,
	DEFAULT_META,
	TABS,
}
