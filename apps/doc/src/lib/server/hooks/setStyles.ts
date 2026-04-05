import type {Handle} from '@sveltejs/kit'

import ui from '@fat-fuzzy/ui'
import uiStateService from '$lib/server/services/session'

const {APP_PREFIX} = ui.constants

export const setStyles =
	(): Handle =>
	async ({event, resolve}) => {
		const {cookies} = event
		// Load all UI states into locals
		const preferences = uiStateService.getUiState({
			cookies,
			key: `${APP_PREFIX}-preferences`,
		})

		// Global Forms
		event.locals.appContext = {
			...preferences,
		}
		return resolve(event)
	}
