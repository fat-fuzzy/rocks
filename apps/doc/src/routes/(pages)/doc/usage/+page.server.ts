import uiActions from '$lib/forms/actions/ui-actions'
import settingsActions from '$lib/forms/actions/settings-actions'

export const load = async ({parent}) => {
	let {sidebar} = await parent()
	return {
		sidebar,
	}
}

export const actions = {
	toggleNav: async (event) => {
		const updated = await uiActions.handleToggleNav(event)
		event.locals.nav = updated.state
	},
	toggleSidebar: async (event) => {
		const updated = await uiActions.handleToggleSidebar(event)
		event.locals.sidebar = updated.state
	},
	toggleSettings: async (event) => uiActions.handleToggleSettings(event),
	toggleUsage: async (event) => uiActions.handleToggleUsage(event),
	toggleDecisions: async (event) => uiActions.handleToggleDecisions(event),
	updateSettings: async (event) =>
		settingsActions.handleUpdateAppSettings({event}),
}
