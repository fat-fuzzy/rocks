import type {UiActionSetInput, UiActionSetOutput} from '$lib/types/actions.js'
import {error} from '@sveltejs/kit'
import ui from '@fat-fuzzy/ui'

import uiStateService from '$lib/forms/services/ui-state.js'
const {AppContext} = ui.forms
const {DEFAULT_PREFERENCES} = ui.constants

const {APP_PREFIX} = ui.constants
/**
 * TODO validate input
 */
async function handleUpdateAppSettings({
	event,
	options,
}: UiActionSetInput): Promise<UiActionSetOutput> {
	const {request, cookies} = event
	const data = await request.formData()
	const key = `${APP_PREFIX}-preferences`
	let currentState = DEFAULT_PREFERENCES

	try {
		const newState = new AppContext(currentState)

		if (!newState.update(data)) {
			error(500, `Failed to update ${key}`)
		}

		uiStateService.setUiState({
			cookies,
			key,
			value: newState.app,
			options: {
				host: options?.domain,
				path: '/',
			},
		})

		return {
			success: true,
			key,
			state: newState.toString(),
		}
	} catch (error) {
		return {
			success: false,
			key,
			message: `Failed to update ${key}`, // TODO: improve / manage error message with intl package,
			state: currentState.toString(),
		}
	}
}

async function handleToggleBrightness(event) {
	const element = 'brightness'
	return handleUpdateAppSettings({
		event,
		element,
		options: {},
	})
}

async function handleToggleContrast(event) {
	const element = 'contrast'
	return handleUpdateAppSettings({
		event,
		element,
		options: {},
	})
}

export default {
	handleToggleBrightness,
	handleToggleContrast,
	handleUpdateAppSettings,
}
