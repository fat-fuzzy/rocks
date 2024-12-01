import type {UiActionSetInput} from '$lib/types/actions.js'
import {error, fail} from '@sveltejs/kit'
import ui from '@fat-fuzzy/ui'

import uiStateService from '$lib/forms/services/ui-state.js'
const {SettingsUpdate} = ui.forms
const {DEFAULT_APP_SETTINGS} = ui.constants

const {APP_PREFIX} = ui.constants
/**
 * TODO validate input
 */
async function handleToggleAppSettings({event}: UiActionSetInput) {
	const {request, cookies} = event

	try {
		const data = await request.formData()
		const key = `${APP_PREFIX}-settings-app`
		let currentState = DEFAULT_APP_SETTINGS
		const settingsUpdate = new SettingsUpdate(currentState)

		if (!settingsUpdate.update(data)) {
			error(500, `Failed to update ${key}`)
		}

		uiStateService.setUiState({
			cookies,
			key,
			value: settingsUpdate.toString(),
			options: {
				host: '',
				path: '/',
			},
		})

		return {
			success: true,
			key,
			state: settingsUpdate.toString(),
		}
	} catch (error) {
		console.error(error)
		return fail(500, {
			success: false,
			type: element,
			error: 'Failed to update settings', // TODO: improve / manage error message with intl package
		})
	}
}

async function handleToggleBrightness(event) {
	const element = 'brightness'
	return handleToggleAppSettings({
		event,
		element,
		options: {},
	})
}

async function handleToggleContrast(event) {
	const element = 'contrast'
	return handleToggleAppSettings({
		event,
		element,
		options: {},
	})
}

export default {
	handleToggleBrightness,
	handleToggleContrast,
	handleToggleAppSettings,
}
