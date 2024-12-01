import type {UiStateGetInput, UiStateSetInput} from '$types'

/**
 * TODO improve types, validate serialized ?
 * @param param0
 * @returns
 */
function getUiState({cookies, key, options}: UiStateGetInput): any {
	const serialized = cookies.get(key)

	if (!serialized) {
		return options.state
	}

	return JSON.parse(serialized)
}

function setUiState({cookies, key, value, options}: UiStateSetInput) {
	cookies.set(key, JSON.stringify(value), options)
}

export default {getUiState, setUiState}
