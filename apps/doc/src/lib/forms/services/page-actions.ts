import uiActions from '$lib/forms/actions/ui-actions'
import settingsActions from '$lib/forms/actions/settings-actions'

export const commonActions = {
	toggleNav: async (event) => {
		const updated = await uiActions.handleToggleNav(event)
		event.locals.nav = updated.state
	},
	toggleSidebar: async (event) => {
		const updated = await uiActions.handleToggleSidebar(event)
		event.locals.sidebar = updated.state
	},
	toggleSettings: async (event) => uiActions.handleToggleSettings(event),
	updateSettings: async (event) => {
		const updated = await settingsActions.handleUpdateAppSettings({event})
		event.locals.settings = JSON.parse(updated.state)
	},
	reset: async ({cookies}) => {
		cookies.getAll().forEach((cookie) => {
			if (cookie.name.startsWith('ff-')) {
				cookies.delete(cookie.name, {path: '/'})
			}
		})
	},
}
