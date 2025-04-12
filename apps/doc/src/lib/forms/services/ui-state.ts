import type {Cookies} from '@sveltejs/kit'
import type {UiStateGetInput, UiStateSetInput} from '$lib/types/services.js'

const expire = {
	short: 60 * 60 * 15,
	medium: 60 * 60 * 24,
	long: 60 * 60 * 24 * 24 * 3,
}

function setSecureCookie({
	cookies,
	key,
	value,
	path = '/',
	maxAge = expire.short,
}: {
	cookies: Cookies
	key: string
	value: string
	path?: string
	maxAge?: number
}) {
	cookies.set(key, value, {
		httpOnly: true,
		sameSite: 'strict',
		secure: true,
		path,
		maxAge,
	})
}

/**
 * @param {cookies, key} Cookies object and key to get the state
 * @returns
 */
function getUiState({cookies, key}: UiStateGetInput): any {
	const serialized = cookies.get(key)
	if (!serialized) {
		return {}
	}

	return JSON.parse(serialized)
}

function setUiState({cookies, key, value, options}: UiStateSetInput) {
	setSecureCookie({
		cookies,
		key,
		value: JSON.stringify(value),
		path: options.path ?? '/',
		maxAge: expire.short,
	})
}

export default {getUiState, setUiState}
