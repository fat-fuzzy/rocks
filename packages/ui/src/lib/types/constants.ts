import type {Settings, UiRevealState, Tab, ButtonContext} from '$types'
import {UiColor, UiSize, UiState} from '$types'
import {SWITCH_MACHINE} from '$lib/components/blocks/buttons/Switch/definitions.js'
import {EXPAND_MACHINE} from '$lib/components/blocks/buttons/Expand/definitions.js'

const APP_PREFIX = 'ff'

const DEFAULT_BUTTON_CONTEXT: ButtonContext = {
	id: '',
	name: '',
	value: '',
}

const DEFAULT_REVEAL_STATE: UiRevealState = {reveal: UiState.collapsed}

const DEFAULT_NAV_REVEAL_STATE: UiRevealState = {reveal: UiState.expanded}

const DEFAULT_APP_SETTINGS: Settings = {brightness: '', contrast: ''}

const DEFAULT_SCENE_ID = '004'

const DEFAULT_DS_STATE: {
	menuReveal: UiRevealState
	navReveal: UiRevealState
	sidebarReveal: UiRevealState
	settingsReveal: UiRevealState
} = {
	menuReveal: {reveal: UiState.collapsed},
	navReveal: {reveal: UiState.collapsed},
	sidebarReveal: {reveal: UiState.collapsed},
	settingsReveal: {reveal: UiState.collapsed},
}

const STATE_SWITCHER: {[key: string]: string} = {
	active: UiState.inactive,
	inactive: UiState.active,
}

const TRANSITION_REVEAL: {[key: string]: string} = {
	expanded: UiState.collapsed,
	collapsed: UiState.expanded,
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
	{
		id: 'component.context.menu.toggle.doc',
		name: 'component.context.menu.toggle.doc',
		title: 'Doc',
		value: 'doc',
	},
	{
		id: 'component.context.menu.toggle.playbook',
		name: 'component.context.menu.toggle.playbook',
		title: 'Playbook',
		value: 'playbook',
	},
]

/**
 * Indicates the direction that icons should point in when used to indicate direction of movement of the UI element under control
 */
const ALIGN_ANIMATION_DIRECTION: {
	[inactivePosition: string]: {[state: string]: string}
} = {
	left: {expanded: 'down', collapsed: 'right'},
	right: {expanded: 'down', collapsed: 'left'},
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

const DEFAULT_STYLES /*: StyleTree */ = {
	tokens: {
		element: {color: 'primary', typography: 'h1'},
	},
	app: {
		settings: {
			brightness: '',
			contrast: '',
		} /* theme: {theme: 'ui'} // TODO : figure out if it is possible to do a dynamic import of app theme */,
	},
	blocks: {
		element: {
			variant: 'fill',
			color: '',
			status: 'default',
			context: 'form',
			// theme: {theme: 'ui'}, // TODO: figure out how to load app styles (i.e. load CSS with prefix, encapsulate component content): maybe: use web components ?
			asset: 'default',
			size: 'md',
			spell: 'bleu',
			uno: 'magic',
			due: 'sparkles',
		},
	},
	layouts: {
		layout: {layout: 'switcher', threshold: 'md', breakpoint: 'lg'}, // need large breakpoint for Header default demo
		container: {container: 'center', size: 'md'},
	},
}

const TABS: Tab[] = [
	{
		id: 'context.menu.toggle.playbook',
		name: 'context.menu.toggle.playbook',
		title: 'Playbook',
		size: UiSize.lg,
		color: UiColor.accent,
		asset: 'playbook',
		value: 'playbook',
	},
	{
		id: 'context.menu.toggle.doc',
		name: 'context.menu.toggle.doc',
		title: 'Doc',
		size: UiSize.lg,
		color: UiColor.primary,
		asset: 'doc',
		value: 'doc',
	},
]

const APP_LINKS: {[key: string]: string}[] = [
	{slug: 'about', title: 'About', layout: 'center'},
]

const APP_SETTINGS: SettingsItems = {
	switch: [
		{
			id: 'brightness',
			name: 'brightness',
			title: 'Brightness',
			variant: 'outline',
			value: 'day',
			shape: 'round',
			color: 'primary',
			size: 'sm',
			states: {
				active: {
					...SWITCH_MACHINE.active,
					text: 'night',
					value: 'night',
					asset: 'night',
				},
				inactive: {
					...SWITCH_MACHINE.inactive,
					text: 'day',
					value: 'day',
					asset: 'day',
				},
			},
		},
		{
			id: 'contrast',
			name: 'contrast',
			title: 'Contrast',
			variant: 'outline',
			value: 'contrast',
			shape: 'round',
			color: 'primary',
			size: 'sm',
			states: {
				active: {
					...SWITCH_MACHINE.active,
					text: 'contrast',
					value: 'contrast',
					asset: 'contrast',
				},
				inactive: {
					...SWITCH_MACHINE.inactive,
					text: 'blend',
					value: 'blend',
					asset: 'blend',
				},
			},
		},
	],
	links: [
		{
			id: 'link-github',
			title: 'GitHub',
			url: 'https://github.com/fat-fuzzy/rocks',
			asset: 'svg:github',
			shape: 'round',
			size: 'md',
			color: 'primary',
		},
	],
}

import type {SettingsItems} from '../components/recipes/forms/settings.js'

export default {
	APP_PREFIX,
	UI_STATE,
	STATE_SWITCHER,
	DEFAULT_BUTTON_CONTEXT,
	DEFAULT_TABS,
	DEFAULT_STYLES,
	DEFAULT_REVEAL_STATE,
	DEFAULT_NAV_REVEAL_STATE,
	DEFAULT_APP_SETTINGS,
	DEFAULT_DS_STATE,
	DEFAULT_SCENE_ID,
	TRANSITION_REVEAL,
	TRANSITION_BRIGHTNESS,
	TRANSITION_CONTRAST,
	ALIGN_OPPOSITE,
	ALIGN_ANIMATION_DIRECTION,
	NUMBER_TO_SIZE,
	TABS,
	APP_LINKS,
	APP_SETTINGS,
	SWITCH_MACHINE,
	EXPAND_MACHINE,
}
