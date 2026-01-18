import type {Cookies} from '@sveltejs/kit'

export type UiStateGetInput = {
	cookies: Cookies
	key: string
}

export type UiStateSetInput = {
	cookies: Cookies
	key: string
	value?: any
	options: {path: string; domain?: string}
}
