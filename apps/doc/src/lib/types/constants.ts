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
	{slug: 'about', title: 'About', layout: 'taco'},
]

export default {
	UI_STATE,
	DEFAULT_REVEAL_STATE,
	TRANSITION_REVEAL,
	TRANSITION_BRIGHTNESS,
	TRANSITION_CONTRAST,
	ALIGN_OPPOSITE,
	ALIGN_ANIMATION_DIRECTION,
	NUMBER_TO_SIZE,
	APP_LINKS,
}
