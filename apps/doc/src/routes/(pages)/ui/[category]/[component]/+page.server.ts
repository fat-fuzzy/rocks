import uiActions from '$lib/forms/actions/ui-actions'

export const actions = {
	toggleSidebar: async (event) => uiActions.handleToggleSidebar(event),
	toggleTokens: async (event) => uiActions.handleToggleTokens(event),
	toggleBlocks: async (event) => uiActions.handleToggleBlocks(event),
	toggleLayouts: async (event) => uiActions.handleToggleLayouts(event),
	toggleRecipes: async (event) => uiActions.handleToggleRecipes(event),
}
