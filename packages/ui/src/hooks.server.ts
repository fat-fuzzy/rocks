import type {Handle} from '@sveltejs/kit'

export const handle = (async ({event, resolve}) => {
	const appSettings = event.cookies.get('fat-fuzzy-settings-app')
	const navReveal = event.cookies.get('fat-fuzzy-nav-reveal')
	const settingsReveal = event.cookies.get('fat-fuzzy-settings-reveal')
	const sidebarReveal = event.cookies.get('fat-fuzzy-sidebar-reveal')
	const dsStyles = event.cookies.get('fat-fuzzy-ui-styles')
	const dsState = event.cookies.get('fat-fuzzy-ui-state')
	const currentTab = event.cookies.get('fat-fuzzy-ui-tabs')

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
	if (currentTab) {
		event.locals.currentTab = currentTab
	}
	const response = await resolve(event)
	return response
}) satisfies Handle
