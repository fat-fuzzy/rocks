/**
 * A thin wrapper around cookie-based ui state
 */

import {browser} from '$app/env'

function loadState(key: string, cookieValue: object) {
	if (browser) {
		const local = localStorage.getItem(key)
		if (local !== null) return JSON.parse(local)
	}
	return cookieValue // fall back to what the server sent
}

function saveState(key: string, value: object) {
	if (browser) {
		localStorage.setItem(key, JSON.stringify(value))
	}
}

export default {
	loadState,
	saveState,
}
