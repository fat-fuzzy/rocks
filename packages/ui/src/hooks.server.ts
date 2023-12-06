import type {Handle} from '@sveltejs/kit'

export const handle = (async ({event, resolve}) => {
	const appSettings = event.cookies.get('fat-fuzzy-settings-app')
	const navReveal = event.cookies.get('fat-fuzzy-nav-reveal')
	const settingsReveal = event.cookies.get('fat-fuzzy-settings-reveal')
	const sidebarReveal = event.cookies.get('fat-fuzzy-sidebar-reveal')
	const contextReveal = event.cookies.get('fat-fuzzy-ui-context-reveal')
	const styles = event.cookies.get('fat-fuzzy-ui')

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
	if (styles) {
		event.locals.styles = styles
	}
	if (contextReveal) {
		event.locals.context = contextReveal
	}
	const response = await resolve(event)
	return response
}) satisfies Handle
