import type {Handle} from '@sveltejs/kit'

export const handle = (async ({event, resolve}) => {
	const appSettings = event.cookies.get('fat-fuzzy-settings-app')
	const navReveal = event.cookies.get('fat-fuzzy-nav-reveal')
	const navRevealTokens = event.cookies.get('fat-fuzzy-reveal-tokens')
	const navRevealBlocks = event.cookies.get('fat-fuzzy-reveal-blocks')
	const navRevealLayouts = event.cookies.get('fat-fuzzy-reveal-layouts')
	const navRevealRecipes = event.cookies.get('fat-fuzzy-reveal-recipes')
	const settingsReveal = event.cookies.get('fat-fuzzy-settings-reveal')
	const sidebarReveal = event.cookies.get('fat-fuzzy-sidebar-reveal')
	const dsStyles = event.cookies.get('fat-fuzzy-ui-styles')
	const dsState = event.cookies.get('fat-fuzzy-ui-state')
	const currentTabs = event.cookies.get('fat-fuzzy-ui-tabs')

	if (navReveal) {
		event.locals.nav = navReveal
	}
	if (navRevealTokens) {
		event.locals.navTokens = navRevealTokens
	}
	if (navRevealBlocks) {
		event.locals.navBlocks = navRevealBlocks
	}
	if (navRevealLayouts) {
		event.locals.navLayouts = navRevealLayouts
	}
	if (navRevealRecipes) {
		event.locals.navRecipes = navRevealRecipes
	}
	if (navReveal) {
		event.locals.nav = navReveal
	}
	if (navReveal) {
		event.locals.nav = navReveal
	}
	if (navReveal) {
		event.locals.nav = navReveal
	}
	if (navReveal) {
		event.locals.nav = navReveal
	}
	if (sidebarReveal) {
		event.locals.sidebar = sidebarReveal
	}
	if (settingsReveal) {
		event.locals.settings = settingsReveal
	}
	if (appSettings) {
		event.locals.app = appSettings
	}
	if (dsState) {
		event.locals.dsState = dsState
	}
	if (dsStyles) {
		event.locals.dsStyles = dsStyles
	}
	if (currentTabs) {
		event.locals.currentTabs = currentTabs
	}
	const response = await resolve(event)
	return response
}) satisfies Handle
