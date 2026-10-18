import type {UiActionSetOutput} from '#lib/types/actions.js'
import type {RequestEvent} from '@sveltejs/kit'
import {AppContext} from '@fat-fuzzy/ui'

import config from '#config/setup.js'
import uiStateService from '#lib/server/services/session.js'

const {APP_PREFIX, DEFAULT_COOKIES_PREFERENCES} = config

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
		// FIXME: use schema for this
		const newState = new AppContext(currentState)
		let updatedState

		if (!newState.update(data).success) {
			updatedState = DEFAULT_COOKIES_PREFERENCES
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
			state: DEFAULT_COOKIES_PREFERENCES,
		}
	}
}

export default {
	handleUpdateAppSettings,
}
