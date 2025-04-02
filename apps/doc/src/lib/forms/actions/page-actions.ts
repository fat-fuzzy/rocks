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
	toggleAppContext: async (event) => {
		const updated = await uiActions.handleToggleAppContext(event)
		event.locals.appContext.reveal = updated.state.reveal
	},
	updateSettings: async (event) => {
		const updated = await settingsActions.handleUpdateAppSettings({event})
		event.locals.appContext.preferences = JSON.parse(updated.state)
	},
	togglePageContext: async (event) => {
		const updated = await uiActions.handleTogglePageContext(event)
		event.locals.pageContext = updated.state
	},
	reset: async ({cookies}) => {
		cookies.getAll().forEach((cookie) => {
			if (cookie.name.startsWith('ff-')) {
				cookies.delete(cookie.name, {path: '/'})
			}
		})
	},
}
