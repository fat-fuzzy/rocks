import type {Settings, StyleTree, Meta} from '$types'

const DEFAULT_REVEAL_STATE: Settings = {reveal: 'minimize'}

const DEFAULT_NAV_REVEAL_STATE: Settings = {reveal: 'expanded'}

const DEFAULT_APP_SETTINGS: Settings = {brightness: 'day', contrast: 'blend'}

const DEFAULT_DS_STATE: {
	menuReveal: Settings
	navReveal: Settings
	sidebarReveal: Settings
	settingsReveal: Settings
} = {
	menuReveal: {reveal: 'collapsed'},
	navReveal: {reveal: 'collapsed'},
	sidebarReveal: {reveal: 'collapsed'},
	settingsReveal: {reveal: 'collapsed'},
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
			},
		},
	},
	layouts: {
		families: {
			container: {container: 'center', size: 'md'},
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
		variant: 'outline',
		color: 'primary',
		size: 'md',
		shape: 'round',
		asset: 'doc',
	},
	{
		slug: 'playbook',
		title: 'Playbook',
		initial: false,
		variant: 'outline',
		color: 'accent',
		size: 'md',
		shape: 'round',
		asset: 'playbook',
	},
]
export default {
	DEFAULT_STYLES,
	DEFAULT_REVEAL_STATE,
	DEFAULT_NAV_REVEAL_STATE,
	DEFAULT_APP_SETTINGS,
	DEFAULT_DS_STATE,
	TRANSITION_REVEAL,
	NUMBER_TO_SIZE,
	DEFAULT_META,
	TABS,
}
