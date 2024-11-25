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

		console.log('handleUiToggleReveal data', data)

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

		console.log('handleUiToggleReveal newState.state', newState.state)
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
	console.log('toggleSidebar event', event)

	const element = 'sidebar'
	return handleUiToggleReveal({
		event,
		element,
		options: {},
	})
}

export default {handleToggleSidebar}
