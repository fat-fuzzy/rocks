import type {RequestEvent} from '@sveltejs/kit'
import ui from '@fat-fuzzy/ui'

import settingsActions from '$lib/server/actions/settings-actions'

const {APP_PREFIX} = ui.constants

export const commonActions = {
	saveCookiePreferences: async (event: RequestEvent) => {
		const updated = await settingsActions.handleUpdateAppSettings(event)
		event.locals.appContext.consent = updated.state?.consent || undefined
	},
	reset: async ({cookies}: RequestEvent) => {
		cookies.getAll().forEach((cookie) => {
			if (cookie.name.startsWith(APP_PREFIX)) {
				cookies.delete(cookie.name, {path: '/'})
			}
		})
	},
}
