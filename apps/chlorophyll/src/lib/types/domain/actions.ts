import type {RequestEvent, Cookies} from '@sveltejs/kit'

export type UiActionGetInput = {
	cookies: Cookies
	key: string
	// eslint-disable-next-line
	defaultAction?: any
}

export type UiStateGetInput = {
	cookies: Cookies
	key: string
}

export type UiStateSetInput = {
	cookies: Cookies
	key: string
	// eslint-disable-next-line
	value?: any
	options: {path: string; domain?: string}
}

export type UiActionSetInput = {
	event: RequestEvent
	element?: string
	// eslint-disable-next-line
	value?: any
	options: {
		// eslint-disable-next-line
		state?: any
		domain?: string
	} // TODO: improve options (use schema ?)
}

export type UiActionSetOutput = {
	success: boolean
	key?: string
	type?: string
	// eslint-disable-next-line
	state?: any
	message?: string
}

export type SecureCookieProps = {
	cookies: Cookies
	key: string
	// eslint-disable-next-line
	value: any
	path?: string
	maxAge?: number
}
