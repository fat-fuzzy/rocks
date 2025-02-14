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
		console.log('updateSettings event.locals.settings', event.locals.settings)
	},

	restart: async ({cookies, url}) => {
		cookies.delete('ff-ui-styles', {path: '/'})
		cookies.delete('ff-ui-state', {path: '/'})
		cookies.delete('ff-ui-context-reveal', {path: '/'})
	},
}
