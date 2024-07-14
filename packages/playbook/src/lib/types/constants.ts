import type {Settings} from '$types'
import type {StyleTree} from '$lib/api/styles.types'

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

const DEFAULT_TABS: Tab[] = [
	// TODO: figure out a better way to map range number values to class strings
	{
		id: 'component.context.menu.toggle.doc',
		name: 'component.context.menu.toggle.doc',
		title: 'Doc',
		value: 'doc',
	},
	{
		id: 'component.context.menu.toggle.demo',
		name: 'component.context.menu.toggle.demo',
		title: 'Demo',
		value: 'demo',
	},
]

const TABS: Tab[] = [
	{
		id: 'context.menu.toggle.demo',
		name: 'context.menu.toggle.demo',
		title: 'Demo',
		size: 'lg',
		color: 'accent',
		asset: 'demo',
		value: 'demo',
	},
	{
		id: 'context.menu.toggle.doc',
		name: 'context.menu.toggle.doc',
		title: 'Doc',
		size: 'lg',
		color: 'primary',
		asset: 'doc',
		value: 'doc',
	},
]

const DEFAULT_STYLES: StyleTree = {
	tokens: {
		element: {color: 'primary', typography: 'h1'},
	},
	app: {
		settings: {
			brightness: 'day',
			contrast: 'blend',
		} /* theme: {theme: 'ui'} // TODO : figure out if it is possible to do a dynamic import of app theme */,
	},
	blocks: {
		element: {
			variant: 'fill',
			color: '',
			status: 'default',
			context: 'form',
			// theme: {theme: 'ui'}, // TODO: figure out how to load app styles (i.e. load CSS with prefix, encapsulate component content): maybe: use web components ?
			asset: 'emoji:default',
			size: 'md',
		},
	},
	layouts: {
		// layout: {layout: 'switcher', threshold: 'md', breakpoint: 'lg'}, // need large breakpoint for Header default demo
		container: {container: 'center', size: 'md'},
		// content: {content: 'card', side: 'card', main: 'text'}, // TODO: fix demo content
	},
}

export default {
	DEFAULT_STYLES,
	DEFAULT_REVEAL_STATE,
	DEFAULT_NAV_REVEAL_STATE,
	DEFAULT_APP_SETTINGS,
	DEFAULT_DS_STATE,
	TRANSITION_REVEAL,
	NUMBER_TO_SIZE,
	DEFAULT_TABS,
	TABS,
}
