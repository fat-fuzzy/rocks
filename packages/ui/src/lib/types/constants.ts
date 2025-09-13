import type {
	AppContextItems,
	UiRevealState,
	CookiePreferences,
	ViewingPreferences,
} from '$types'
import {UiState} from '$types'
import {SWITCH_MACHINE} from '$lib/components/blocks/buttons/Switch/definitions.js'
import {EXPAND_MACHINE} from '$lib/components/blocks/buttons/Expand/definitions.js'

const APP_PREFIX = 'ff'

const DEFAULT_COOKIES_CONSENT: CookiePreferences = {
	functional: true,
	legitimateInterest: true,
	analytics: false,
}

const DEFAULT_REVEAL_STATE: UiRevealState = {reveal: UiState.collapsed}

const DEFAULT_SIDEBAR_REVEAL_STATE: UiRevealState = {reveal: UiState.collapsed}

const DEFAULT_NAV_REVEAL_STATE: UiRevealState = {reveal: UiState.collapsed}

const DEFAULT_PREFERENCES: ViewingPreferences = {
	reveal: UiState.collapsed,
	consent: DEFAULT_COOKIES_CONSENT,
}

const DEFAULT_SCENE_ID = '004'

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
		families: {
			element: {color: 'primary', typography: 'h1'},
		},
	},
	app: {
		families: {
			settings: {
				brightness: '',
				contrast: '',
			} /* theme: {theme: 'ui'} // TODO : figure out if it is possible to do a dynamic import of app theme */,
		},
	},
	blocks: {
		families: {
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
	},
	layouts: {
		families: {
			layout: {layout: 'switcher', threshold: 'md', breakpoint: 'lg'}, // need large breakpoint for Header default demo
			container: {container: 'taco', size: 'md'},
		},
	},
}

const APP_LINKS: {[key: string]: string}[] = [
	{slug: 'about', title: 'About', layout: 'taco'},
]

const APP_SETTINGS: AppContextItems = {
	display: [
		{
			id: 'brightness',
			name: 'brightness',
			title: 'Brightness',
			variant: 'outline',
			shape: 'round',
			color: 'primary',
			size: 'xs',
			states: {
				active: {
					...SWITCH_MACHINE.active,
					value: 'night',
					asset: 'night',
				},
				inactive: {
					...SWITCH_MACHINE.inactive,
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
			shape: 'round',
			color: 'primary',
			size: 'xs',
			states: {
				active: {
					...SWITCH_MACHINE.active,
					value: 'contrast',
					asset: 'contrast',
				},
				inactive: {
					...SWITCH_MACHINE.inactive,
					value: 'blend',
					asset: 'blend',
				},
			},
		},
	],
}

export default {
	APP_PREFIX,
	UI_STATE,
	STATE_SWITCHER,
	DEFAULT_STYLES,
	DEFAULT_REVEAL_STATE,
	DEFAULT_NAV_REVEAL_STATE,
	DEFAULT_SIDEBAR_REVEAL_STATE,
	DEFAULT_PREFERENCES,
	DEFAULT_SCENE_ID,
	TRANSITION_REVEAL,
	TRANSITION_BRIGHTNESS,
	TRANSITION_CONTRAST,
	ALIGN_OPPOSITE,
	ALIGN_ANIMATION_DIRECTION,
	NUMBER_TO_SIZE,
	APP_LINKS,
	APP_SETTINGS,
	SWITCH_MACHINE,
	EXPAND_MACHINE,
}
