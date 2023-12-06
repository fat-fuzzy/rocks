import type {LayoutServerLoad} from './$types'

export const load = (async (event) => {
	let settings = null
	let app = null
	let nav = null
	if (event.locals.nav) {
		nav = JSON.parse(event.locals.nav)
	}
	if (event.locals.settings) {
		settings = JSON.parse(event.locals.settings)
	}
	if (event.locals.app) {
		app = JSON.parse(event.locals.app)
	}

	return {settings, app, nav}
}) satisfies LayoutServerLoad
