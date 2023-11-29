import type {Handle} from '@sveltejs/kit'

export const handle = (async ({event, resolve}) => {
	const appSettings = await Promise.resolve(event.cookies.get('fat-fuzzy-settings-app'))
	const navReveal = await Promise.resolve(event.cookies.get('fat-fuzzy-nav-reveal'))
	const settingsReveal = await Promise.resolve(event.cookies.get('fat-fuzzy-settings-reveal'))
	const sidebarReveal = await Promise.resolve(event.cookies.get('fat-fuzzy-sidebar-app'))
	const styles = await Promise.resolve(event.cookies.get('fat-fuzzy-ui'))

	if (styles) {
		event.locals.styles = styles
	}
	if (settingsReveal) {
		event.locals.settings = settingsReveal
	}
	if (appSettings) {
		event.locals.app = appSettings
	}
	if (navReveal) {
		event.locals.nav = navReveal
	}
	if (sidebarReveal) {
		event.locals.nav = sidebarReveal
	}

	const response = await resolve(event)
	return response
}) satisfies Handle
