import ui from '@fat-fuzzy/ui'

const {uiActions} = ui.actions

export const actions = {
	toggleSidebar: async (event) => uiActions.handleToggleSidebar(event),
	toggleNav: async (event) => uiActions.handleToggleNav(event),
	toggleUsage: async (event) => uiActions.handleToggleUsage(event),
	toggleDecisions: async (event) => uiActions.handleToggleDecisions(event),
}
