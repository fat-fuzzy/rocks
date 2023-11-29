export type ButtonType = 'button' | 'submit' | 'reset' | null | undefined

export type Settings = {
	[key: string]: string
}

export type ButtonState = {
	[key: string]: {text: string; value: string; asset: string}
}

export const DEFAULT_REVEAL_STATE: Settings = {reveal: 'minimize'}
export const DEFAULT_APP_SETTINGS: Settings = {brightness: 'day', contrast: 'blend'}

export const TRANSITION_REVEAL: {[key: string]: string} = {
	show: 'minimize',
	minimize: 'show',
}

export const TRANSITION_BRIGHTNESS: {[key: string]: string} = {
	day: 'night',
	night: 'day',
}

export const TRANSITION_CONTRAST: {[key: string]: string} = {
	contrast: 'blend',
	blend: 'contrast',
}

export const ALIGN_OPPOSITE: {[key: string]: string} = {
	end: 'start',
	start: 'end',
}

export const NUMBER_TO_SIZE: {[key: string]: string} = {
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
export const ALIGN_ANIMATION_DIRECTION: {[inactivePosition: string]: {[state: string]: string}} = {
	left: {show: 'down', minimize: 'left'},
	right: {show: 'down', minimize: 'right'},
	top: {show: 'down', minimize: 'up'},
	bottom: {show: 'up', minimize: 'down'},
}

export const uiState = {
	DEFAULT: 'default',
	FOCUS: 'focus',
	HOVER: 'hover',
	ACTIVE: 'active',
	SUCCESS: 'success',
	ERROR: 'error',
}

export const themes = ['night', 'day']

export const emojis: {[key: string]: string} = {
	lang: '🌐',
	day: '☀️',
	night: '🌙',
	'fr-fr': '🇫🇷 FR',
	'es-es': '🇪🇸 ES',
	'en-uk': '🇬🇧 EN',
}

export const langEmojis: {[key: string]: string} = {
	'fr-fr': '🇫🇷 FR',
	'es-es': '🇪🇸 ES',
	'en-uk': '🇬🇧 EN',
}

export const langMenuIcon = emojis['lang']
export const languages = [
	{code: 'fr-fr', title: 'Français'},
	{code: 'en-uk', title: 'English'},
	{code: 'es-es', title: 'Español'},
]

// TODO: make svg css themeable / fix dark theme
import githubDay from '$lib/images/day/icon-github.svg'
import githubNight from '$lib/images/night/icon-github.svg'
// TODO: make svg css themeable / fix dark theme
export const assets: {[key: string]: {[key: string]: string}} = {
	day: {
		'link-github': githubDay,
		'button-theme': '☀️',
	},
	night: {'link-github': githubNight, 'button-theme': emojis.night},
}
// export const emojis = {
// 	splash: {
// 		default: '🥁', // 🥁 drums
// 		success: '✨', // ✨ sparkles
// 		error: '👻', // 👻 ghost
// 	},
// 	animate: {
// 		default: '⚡️', // ⚡️ lightning
// 		success: '🙌', // 🙌 raised hands
// 		error: '🌧', // 🌧 cloud with rain
// 		active: '💥', // 💥 fire spark
// 	},
// 	success: {
// 		tada: '🎉', // 🎉 party-popper
// 		star: '🌟', // 🌟 glowing star
// 		balloon: '🎈', // 🎈 balloon
// 		partyFace: '🥳', // 🥳 party-face
// 		confettiBall: '🎊', // 🎊 confetti-ball
// 	},
// 	error: {
// 		poop: '💩', // 💩 poop
// 		// typeScript: '🍱', // 🍱 bento box
// 		// lint: '🚨', // 🚨 rotating beacon
// 	},
// 	refresh: {
// 		default: '🚿', // 🚿 shower
// 	},
// }
