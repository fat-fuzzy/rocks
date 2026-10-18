import type {RequestEvent} from '@sveltejs/kit'
import config from '#config/setup.js'

import settingsActions from '#lib/server/actions/settings-actions.js'

const {APP_PREFIX} = config

export const commonActions = {
	saveCookiePreferences: async (event: RequestEvent) => {
		const updated = await settingsActions.handleUpdateAppSettings(event)
		event.locals.appContext = updated.state || undefined
	},
	reset: async ({cookies}: RequestEvent) => {
		cookies.getAll().forEach((cookie) => {
			if (cookie.name.startsWith(APP_PREFIX)) {
				cookies.delete(cookie.name, {path: '/'})
			}
		})
	},
}
