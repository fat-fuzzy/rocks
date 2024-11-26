import uiActions from '$lib/forms/actions/ui-actions'

export const actions = {
	toggleSidebar: async (event) => uiActions.handleToggleSidebar(event),
	toggleNav: async (event) => uiActions.handleToggleNav(event),
	toggleUsage: async (event) => uiActions.handleToggleUsage(event),
	toggleDecisions: async (event) => uiActions.handleToggleDecisions(event),
}
