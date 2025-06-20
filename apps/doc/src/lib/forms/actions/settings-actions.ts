import type {UiActionSetOutput} from '$lib/types/actions.js'
import type {RequestEvent} from '@sveltejs/kit'
import {error} from '@sveltejs/kit'
import ui from '@fat-fuzzy/ui'

import uiStateService from '$lib/forms/services/session.js'
const {AppContext} = ui.forms

const {APP_PREFIX} = ui.constants

async function handleUpdateAppSettings(
	event: RequestEvent,
): Promise<UiActionSetOutput> {
	const {request, cookies} = event
	const data = await request.formData()

	const key = `${APP_PREFIX}-preferences`
	const currentState = uiStateService.getUiState({
		cookies,
		key,
	})

	try {
		const newState = new AppContext(currentState)

		if (!newState.update(data).success) {
			error(500, `Failed to update ${key}`)
		}

		uiStateService.setUiState({
			cookies,
			key,
			value: newState.state,
			options: {
				path: '/',
			},
		})

		return {
			success: true,
			key,
			state: newState.state,
		}
	} catch (error) {
		return {
			success: false,
			key,
			message: `Failed to update ${key}`,
		}
	}
}

export default {
	handleUpdateAppSettings,
}
