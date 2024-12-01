import uiActions from '$lib/forms/actions/ui-actions'
import settingsActions from '$lib/forms/actions/settings-actions'

export const actions = {
	toggleNav: async (event) => uiActions.handleToggleNav(event),
	toggleSidebar: async (event) => uiActions.handleToggleSidebar(event),
	toggleSettings: async (event) => uiActions.handleToggleSettings(event),
	toggleUsage: async (event) => uiActions.handleToggleUsage(event),
	toggleDecisions: async (event) => uiActions.handleToggleDecisions(event),
	updateSettings: async (event) =>
		settingsActions.handleToggleAppSettings({event}),
}
