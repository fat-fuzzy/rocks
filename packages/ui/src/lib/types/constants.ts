import type {
	AppContextItems,
	CookiePreferences,
	ViewingPreferences,
	NavItem,
} from '$types'

import {SWITCH_MACHINE} from '$lib/components/blocks/buttons/Switch/definitions.js'
import {EXPAND_MACHINE} from '$lib/components/blocks/buttons/Expand/definitions.js'

const APP_PREFIX = 'ff'

const DEFAULT_COOKIES_CONSENT: CookiePreferences = {
	functional: true,
	legitimateInterest: true,
	analytics: false,
}

const DEFAULT_PREFERENCES: ViewingPreferences = {
	brightness: 'day',
	contrast: 'contrast',
	consent: DEFAULT_COOKIES_CONSENT,
}

const DEFAULT_SCENE_ID = '004'

const STATE_SWITCHER: {[key: string]: string} = {
	active: 'inactive',
	inactive: 'active',
}

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

const APP_LINKS: NavItem[] = [{slug: 'about', label: 'About'}]

const APP_SETTINGS: AppContextItems = {
	display: [
		{
			id: 'brightness',
			name: 'brightness',
			label: 'Brightness',
			variant: 'outline',
			shape: 'round',
			color: 'primary',
			size: 'xs',
			states: {
				active: {
					...SWITCH_MACHINE.active,
					label: 'Night',
					value: 'night',
					asset: 'night',
				},
				inactive: {
					...SWITCH_MACHINE.inactive,
					label: 'Day',
					value: 'day',
					asset: 'day',
				},
			},
		},
		{
			id: 'contrast',
			name: 'contrast',
			label: 'Contrast',
			variant: 'outline',
			shape: 'round',
			color: 'primary',
			size: 'xs',
			states: {
				active: {
					...SWITCH_MACHINE.active,
					label: 'Contrast',
					value: 'contrast',
					asset: 'contrast',
				},
				inactive: {
					...SWITCH_MACHINE.inactive,
					label: 'Blend',
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
