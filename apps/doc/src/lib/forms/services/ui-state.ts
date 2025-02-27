import type {UiStateGetInput, UiStateSetInput} from '$lib/types/services.js'

/**
 * TODO improve types, validate serialized ?
 * @param param0
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
	cookies.delete(key, options)
	if (typeof value === 'string') {
		cookies.set(key, value, options)
	} else {
		cookies.set(key, JSON.stringify(value), options)
	}
}

export default {getUiState, setUiState}
