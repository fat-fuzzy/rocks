export type ButtonType = 'button' | 'submit' | 'reset' | null | undefined

export type Settings = {
	[key: string]: string
}

export type ButtonState = {
	[key: string]: {text: string; value: string; asset: string}
}

export const DEFAULT_REVEAL_STATE: Settings = {reveal: 'minimize'}
export const DEFAULT_APP_SETTINGS: Settings = {brightness: 'day', contrast: 'blend'}
export const REVEAL_TRANSITION: {[key: string]: string} = {
	show: 'minimize',
	minimize: 'show',
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
