import type {Cookies} from '@sveltejs/kit'
import type {UiStateGetInput, UiStateSetInput} from '$lib/types/services.js'
import {dev} from '$app/environment'
import {base} from '$app/paths'

const expire = {
	short: 60 * 60 * 15,
	medium: 60 * 60 * 24,
	long: 60 * 60 * 24 * 24 * 3,
}

const trustedDomains = ['localhost', 'rocks.pages.dev']

function setSecureCookie({
	cookies,
	key,
	value,
	path = base,
	maxAge = expire.short,
	domain,
}: {
	cookies: Cookies
	key: string
	value: string
	path?: string
	maxAge?: number
	domain?: string
}) {
	cookies.set(key, value, {
		httpOnly: true,
		sameSite: 'strict',
		secure: true,
		path,
		maxAge,
		domain,
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
	if (dev) {
		cookies.set(key, JSON.stringify(value), {
			path: options.path ?? '/',
			maxAge: expire.short,
			domain: trustedDomains[0],
		})
	} else {
		setSecureCookie({
			cookies,
			key,
			value: JSON.stringify(value),
			path: options.path ?? '/',
			maxAge: expire.short,
			domain: trustedDomains[1],
		})
	}
}

export default {getUiState, setUiState}
