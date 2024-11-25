import type {UiActionSetInput} from '$types'
import {error, fail} from '@sveltejs/kit'

import uiStateService from '$lib/forms/services/ui-state.js'
import UiReveal from '$lib/forms/services/ui-reveal.js'

/**
 * TODO validate input
 */
async function handleUiToggleReveal({
	event,
	element,
	options,
}: UiActionSetInput) {
	const {request, cookies} = event

	try {
		const data = await request.formData()
		const key = `fat-fuzzy-reveal-${element}`
		const currentState = uiStateService.getUiState({
			cookies,
			key,
			options,
		})

		const reveal = new UiReveal(currentState)
		const newState = reveal.reveal(data)
		if (!newState.success) {
			error(500, `Failed to toggle ${key}`)
		}

		uiStateService.setUiState({
			cookies,
			key,
			value: newState.state,
			options: {
				host: options.domain,
				path: '/',
			},
		})

		return {
			success: true,
			key,
			state: newState.state,
		}
	} catch (error) {
		console.error(error)
		return fail(500, {
			success: false,
			type: element,
			error: 'Failed to update UI state', // TODO: improve / manage error message with intl package
		})
	}
}

async function handleToggleSidebar(event) {
	const element = 'sidebar'
	return handleUiToggleReveal({
		event,
		element,
		options: {},
	})
}

export default {handleToggleSidebar}
