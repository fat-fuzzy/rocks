import {fail} from '@sveltejs/kit'
import {UiState} from './ui-state'
import type {PageServerLoad, Actions} from './$types'

export const load = (({cookies}) => {
	const uiState = new UiState(cookies.get('fat-fuzzy-ui'))
	return {
		uiState: uiState.toString(),
	}
}) satisfies PageServerLoad

export const actions = {
	/**
	 * Modify uiState state in reaction to a keypress. If client-side JavaScript
	 * is available, this will happen in the browser instead of here
	 */
	update: async ({request, cookies}) => {
		const uiState = new UiState(cookies.get('fat-fuzzy-ui'))

		const data = await request.formData()

		if (!uiState.enter(data)) {
			return fail(400, {uiStateError: true})
		}

		cookies.set('fat-fuzzy-ui', uiState.toString())
	},

	/**
	 * Modify uiState state in reaction to a guessed word. This logic always runs on
	 * the server, so that people can't cheat by peeking at the JavaScript
	 */
	enter: async ({request, cookies}) => {
		const uiState = new UiState(cookies.get('fat-fuzzy-ui'))

		const data = await request.formData()

		if (!uiState.enter(data)) {
			return fail(400, {uiStateError: true})
		}

		cookies.set('fat-fuzzy-ui', uiState.toString())
	},

	restart: async ({cookies}) => {
		cookies.delete('fat-fuzzy-ui')
	},
} satisfies Actions
