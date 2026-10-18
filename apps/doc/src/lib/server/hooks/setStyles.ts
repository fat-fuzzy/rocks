import type {Handle} from '@sveltejs/kit/hooks'

import config from '#config/setup.js'
import uiStateService from '#lib/server/services/session.js'

const {APP_PREFIX} = config

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
