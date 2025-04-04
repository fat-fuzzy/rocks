import ui from '@fat-fuzzy/ui'

import uiActions from '$lib/forms/actions/ui-actions'
import settingsActions from '$lib/forms/actions/settings-actions'

const {APP_PREFIX} = ui.constants

export const commonActions = {
	toggleNav: async (event) => {
		const updated = await uiActions.handleToggleNav(event)
		event.locals.nav = updated.state
	},
	toggleSidebar: async (event) => {
		const updated = await uiActions.handleToggleSidebar(event)
		event.locals.sidebar = updated.state
	},
	toggleAppContext: async (event) => {
		const updated = await uiActions.handleToggleAppContext(event)
		event.locals.appContext.reveal = updated.state.reveal
	},
	updateSettings: async (event) => {
		const updated = await settingsActions.handleUpdateAppSettings({event})
		event.locals.appContext.brightness = updated.state.brightness
		event.locals.appContext.contrast = updated.state.contrast
	},
	togglePageContext: async (event) => {
		const updated = await uiActions.handleTogglePageContext(event)
		event.locals.pageContext = updated.state
	},
	reset: async ({cookies}) => {
		cookies.getAll().forEach((cookie) => {
			if (cookie.name.startsWith(APP_PREFIX)) {
				cookies.delete(cookie.name, {path: '/'})
			}
		})
	},
}
