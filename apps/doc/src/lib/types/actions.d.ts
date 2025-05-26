import type {Cookies} from '@sveltejs/kit'

import type {RequestEvent, Cookies} from '@sveltejs/kit'

export type UiActionGetInput = {
	cookies: Cookies
	key: string
	defaultAction?: any
}

export type UiActionSetInput = {
	event: RequestEvent
	element?: string
	value?: any
	options: {
		state?: any
		domain?: string
	} // TODO: improve options (use schema ?)
}

export type UiActionSetOutput = {
	success: boolean
	key?: string
	type?: string
	state?: any
	message?: string
}

export type SecureCookieProps = {
	cookies: Cookies
	key: string
	value: string
	path?: string
	maxAge?: number
}
