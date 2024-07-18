export type ButtonType = 'button' | 'submit' | 'reset' | null | undefined

export type Settings = {
	[key: string]: string
}

export type ButtonState = {
	[key: string]: {
		text: string
		value: string
		asset: string
		onClick?: (event: CustomEvent<any>) => void
	}
}

const DEFAULT_REVEAL_STATE: Settings = {reveal: 'collapsed'}
const DEFAULT_APP_SETTINGS: Settings = {brightness: 'day', contrast: 'blend'}

const TRANSITION_REVEAL: {[key: string]: string} = {
	expanded: 'collapsed',
	collapsed: 'expanded',
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
/**
 * Indicates the direction that icons should point in when used to indicate direction of movement of the UI element under control
 */
const ALIGN_ANIMATION_DIRECTION: {
	[inactivePosition: string]: {[state: string]: string}
} = {
	left: {expanded: 'down', collapsed: 'left'},
	right: {expanded: 'down', collapsed: 'right'},
	top: {expanded: 'down', collapsed: 'up'},
	bottom: {expanded: 'up', collapsed: 'down'},
}

const UI_STATE = {
	DEFAULT: 'default',
	FOCUS: 'focus',
	HOVER: 'hover',
	ACTIVE: 'active',
	SUCCESS: 'success',
	ERROR: 'error',
}

const APP_LINKS: {[key: string]: string}[] = [
	{slug: 'about', title: 'About', layout: 'center'},
]

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
				active: {text: 'night', value: 'night', asset: 'night'},
				inactive: {text: 'day', value: 'day', asset: 'day'},
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
				active: {text: 'contrast', value: 'contrast', asset: 'contrast'},
				inactive: {text: 'blend', value: 'blend', asset: 'blend'},
			},
		},
	],
	links: [
		{
			id: 'link-github',
			title: 'GitHub icon',
			url: 'https://github.com/fat-fuzzy/rocks',
			asset: 'svg:github',
			shape: 'round',
			size: 'sm',
			color: 'primary',
		},
	],
}

const TABS_CONTENT = [
	{
		id: 'context.menu.toggle.demo',
		title: 'Demo',
		size: 'lg',
		color: 'accent',
		asset: 'demo',
		value: 'demo',
	},
	{
		id: 'context.menu.toggle.doc',
		title: 'Doc',
		size: 'lg',
		color: 'primary',
		asset: 'doc',
		value: 'doc',
	},
]

const emojis: {[key: string]: string} = {
	lang: '🌐',
	day: '☀️',
	night: '🌙',
	'fr-fr': '🇫🇷 FR',
	'es-es': '🇪🇸 ES',
	'en-uk': '🇬🇧 EN',
}

const languages = [
	{code: 'fr-fr', title: 'Français'},
	{code: 'en-uk', title: 'English'},
	{code: 'es-es', title: 'Español'},
]

// TODO: make svg css themeable / fix dark theme
import githubDay from '$lib/images/day/icon-github.svg'
import githubNight from '$lib/images/night/icon-github.svg'
// TODO: make svg css themeable / fix dark theme
const SVG_ASSETS: {[key: string]: {[key: string]: string}} = {
	day: {
		'link-github': githubDay,
		'button-theme': '☀️',
	},
	night: {'link-github': githubNight, 'button-theme': emojis.night},
}

export default {
	UI_STATE,
	DEFAULT_REVEAL_STATE,
	DEFAULT_APP_SETTINGS,
	TRANSITION_REVEAL,
	TRANSITION_BRIGHTNESS,
	TRANSITION_CONTRAST,
	ALIGN_OPPOSITE,
	ALIGN_ANIMATION_DIRECTION,
	NUMBER_TO_SIZE,
	SVG_ASSETS,
	APP_LINKS,
	APP_SETTINGS,
	TABS_CONTENT,
}
