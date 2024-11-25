import ui from '@fat-fuzzy/ui'

const {uiActions} = ui.actions

export const actions = {
	toggleSidebar: async (event) => uiActions.handleToggleSidebar(event),
}
