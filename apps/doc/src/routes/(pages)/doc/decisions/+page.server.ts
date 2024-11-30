import uiActions from '$lib/forms/actions/ui-actions'

export const actions = {
	toggleNav: async (event) => uiActions.handleToggleNav(event),
	toggleSidebar: async (event) => uiActions.handleToggleSidebar(event),
	toggleSettings: async (event) => uiActions.handleToggleSettings(event),
	toggleDecisions: async (event) => uiActions.handleToggleDecisions(event),
}
