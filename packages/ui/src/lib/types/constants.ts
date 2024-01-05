import type {Settings, Tab, Geometry3dProps} from '$types'
import type {StyleTree} from '$lib/api/styles/types'
import lib from '@fat-fuzzy/lib'

const DEFAULT_REVEAL_STATE: Settings = {reveal: 'minimize'}

const DEFAULT_NAV_REVEAL_STATE: Settings = {reveal: 'show'}

const DEFAULT_APP_SETTINGS: Settings = {brightness: 'day', contrast: 'blend'}

const DEFAULT_PLAYER_STATE: Settings = {value: ''}
const DEFAULT_GEOMETRY_STATE: Geometry3dProps = lib.gfx.utils.getGeometryDefaults()
const DEFAULT_SCENE_ID = '004'

const DEFAULT_DS_STATE: {
	menuReveal: Settings
	navReveal: Settings
	sidebarReveal: Settings
	settingsReveal: Settings
} = {
	menuReveal: {reveal: 'minimize'},
	navReveal: {reveal: 'minimize'},
	sidebarReveal: {reveal: 'minimize'},
	settingsReveal: {reveal: 'minimize'},
}

const TRANSITION_REVEAL: {[key: string]: string} = {
	show: 'minimize',
	minimize: 'show',
}

const TRANSITION_BRIGHTNESS: {[key: string]: string} = {
	day: 'night',
	night: 'day',
}

const TRANSITION_CONTRAST: {[key: string]: string} = {
	contrast: 'blend',
	blend: 'contrast',
}

const ALIGN_OPPOSITE: {[key: string]: string} = {
	end: 'start',
	start: 'end',
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
	{id: 'component.context.menu.toggle.doc', title: 'Doc', value: 'doc'},
	{id: 'component.context.menu.toggle.demo', title: 'Demo', value: 'demo'},
]

/**
 * Indicates the direction that icons should point in when used to indicate direction of movement of the UI element under control
 */
const ALIGN_ANIMATION_DIRECTION: {[inactivePosition: string]: {[state: string]: string}} = {
	left: {show: 'down', minimize: 'left'},
	right: {show: 'down', minimize: 'right'},
	top: {show: 'down', minimize: 'up'},
	bottom: {show: 'up', minimize: 'down'},
}

const UI_STATE = {
	DEFAULT: 'default',
	FOCUS: 'focus',
	HOVER: 'hover',
	ACTIVE: 'active',
	SUCCESS: 'success',
	ERROR: 'error',
}

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
		layout: {layout: 'switcher', threshold: 'md', breakpoint: 'lg'}, // need large breakpoint for Header default demo
		container: {container: 'center', size: 'md'},
	},
}

const TABS: Tab[] = [
	{
		id: 'context.menu.toggle.demo',
		title: 'Demo',
		size: 'lg',
		color: 'accent',
		asset: 'emoji:demo',
		value: 'demo',
	},
	{
		id: 'context.menu.toggle.doc',
		title: 'Doc',
		size: 'lg',
		color: 'primary',
		asset: 'emoji:doc',
		value: 'doc',
		initial: 'pressed',
	},
]

const APP_LINKS: {[key: string]: string}[] = [{slug: 'about', title: 'About', layout: 'center'}]

const APP_SETTINGS = {
	switch: [
		{
			id: 'brightness',
			name: 'brightness',
			title: 'Brightness',
			variant: 'outline',
			shape: 'round',
			color: 'primary',
			size: 'md',
			states: {
				active: {id: 'night', text: 'night', value: 'night', asset: 'emoji:night'},
				inactive: {id: 'day', text: 'day', value: 'day', asset: 'emoji:day', initial: 'pressed'},
			},
		},
		{
			id: 'contrast',
			name: 'contrast',
			title: 'Contrast',
			variant: 'outline',
			shape: 'round',
			color: 'primary',
			size: 'md',
			states: {
				active: {id: 'contrast', text: 'contrast', value: 'contrast', asset: 'emoji:contrast'},
				inactive: {
					id: 'blend',
					text: 'blend',
					value: 'blend',
					asset: 'emoji:blend',
					initial: 'pressed',
				},
			},
		},
	],
	links: [
		{
			id: 'link-github',
			title: 'GitHub',
			url: 'https://github.com/fat-fuzzy/rocks',
			asset: 'svg:icon-github',
			shape: 'round',
			size: 'md',
		},
	],
}

const emojis: {[key: string]: string} = {
	lang: '🌐',
	day: '☀️',
	night: '🌙',
	'fr-fr': '🇫🇷 FR',
	'es-es': '🇪🇸 ES',
	'en-uk': '🇬🇧 EN',
}

const langEmojis: {[key: string]: string} = {
	'fr-fr': '🇫🇷 FR',
	'es-es': '🇪🇸 ES',
	'en-uk': '🇬🇧 EN',
}

const langMenuIcon = emojis['lang']
const languages = [
	{code: 'fr-fr', title: 'Français'},
	{code: 'en-uk', title: 'English'},
	{code: 'es-es', title: 'Español'},
]

// TODO: make svg css themeable / fix dark theme
import githubDay from '$lib/images/day/icon-github.svg'
import githubNight from '$lib/images/night/icon-github.svg'
const SVG_ASSETS: {[key: string]: {[key: string]: string}} = {
	day: {
		'link-github': githubDay,
		'button-theme': '☀️',
	},
	night: {'link-github': githubNight, 'button-theme': emojis.night},
}

export default {
	UI_STATE,
	DEFAULT_TABS,
	DEFAULT_STYLES,
	DEFAULT_REVEAL_STATE,
	DEFAULT_NAV_REVEAL_STATE,
	DEFAULT_APP_SETTINGS,
	DEFAULT_DS_STATE,
	DEFAULT_PLAYER_STATE,
	DEFAULT_GEOMETRY_STATE,
	DEFAULT_SCENE_ID,
	TRANSITION_REVEAL,
	TRANSITION_BRIGHTNESS,
	TRANSITION_CONTRAST,
	ALIGN_OPPOSITE,
	ALIGN_ANIMATION_DIRECTION,
	NUMBER_TO_SIZE,
	SVG_ASSETS,
	TABS,
	APP_LINKS,
	APP_SETTINGS,
}
