import type {UiActionSetOutput} from '$lib/types/actions.js'
import type {RequestEvent} from '@sveltejs/kit'
import ui from '@fat-fuzzy/ui'

import uiStateService from '$lib/server/services/session.js'
const {AppContext} = ui.forms

const {APP_PREFIX, DEFAULT_PREFERENCES} = ui.constants

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
		// TODO: Fix type checking (currentState == {})
		const newState = new AppContext(currentState)
		let updatedState

		if (!newState.update(data).success) {
			updatedState = DEFAULT_PREFERENCES
		} else {
			updatedState = newState.state
		}

		uiStateService.setUiState({
			cookies,
			key,
			value: updatedState,
			options: {
				path: '/',
			},
		})

		return {
			success: true,
			key,
			state: updatedState,
		}
	} catch {
		return {
			success: false,
			key,
			message: `Failed to update ${key}`,
			state: DEFAULT_PREFERENCES,
		}
	}
}

export default {
	handleUpdateAppSettings,
}
