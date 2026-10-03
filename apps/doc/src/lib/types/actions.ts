import type {Cookies} from '@sveltejs/kit'

export type UiActionSetOutput = {
	success: boolean
	key?: string
	type?: string
	state?: unknown
	message?: string
}

export type SecureCookieProps = {
	cookies: Cookies
	key: string
	value: string
	path?: string
	maxAge?: number
}
