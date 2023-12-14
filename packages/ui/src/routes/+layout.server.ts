import type {LayoutServerLoad} from './$types'

export const load = (async (event) => {
	let settings = null
	let app = null
	let nav = null
	let sidebar = null
	if (event.locals.nav) {
		nav = JSON.parse(event.locals.nav)
	}
	if (event.locals.settings) {
		settings = JSON.parse(event.locals.settings)
	}
	if (event.locals.app) {
		app = JSON.parse(event.locals.app)
	}
	if (event.locals.sidebar) {
		sidebar = JSON.parse(event.locals.sidebar)
	}

	return {settings, app, nav, sidebar}
}) satisfies LayoutServerLoad
