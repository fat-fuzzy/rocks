import type {PageServerLoad, Actions} from './$types'
import {fail} from '@sveltejs/kit'
import {UiState} from '../ui-state'
import {api} from '@fat-fuzzy/ui'
const {stylesStore} = api

export const load = (async ({parent}) => {
	const uiState = await parent()
	return uiState
}) satisfies PageServerLoad

export const actions = {
	/**
	 * Modify uiState state in reaction to a keypress. If client-side JavaScript
	 * is available, this will happen in the browser instead of here
	 */
	update: async ({request, cookies}) => {
		const uiState = new UiState(stylesStore.$currentStyles)
		const data = await request.formData()

		if (!uiState.enter(data)) {
			return fail(400, {uiStateError: true})
		}

		stylesStore.currentStyles.set(uiState.api.getStyleTree())
		cookies.set('fat-fuzzy-ui', uiState.toString(), {path: '/'})

		return {success: true}
	},

	/**
	 * Modify uiState state in reaction to a guessed word. This logic always runs on
	 * the server, so that people can't cheat by peeking at the JavaScript
	 */
	enter: async ({request, cookies}) => {
		const uiState = new UiState(stylesStore.$currentStyles)
		const data = await request.formData()

		if (!uiState.enter(data)) {
			return fail(400, {uiStateError: true})
		}

		stylesStore.currentStyles.set(uiState.api.getStyleTree())
		cookies.set('fat-fuzzy-ui', uiState.toString(), {path: '/'})

		return {success: true}
	},

	restart: async ({cookies}) => {
		cookies.delete('fat-fuzzy-ui', {path: '/'})
	},
} satisfies Actions
