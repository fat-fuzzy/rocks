import ui from '@fat-fuzzy/ui'
const {DEFAULT_PREFERENCES} = ui.constants

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false
export const ssr = true

export const load = async ({locals, url}) => {
	// Main header nav
	locals.nav.actionPath = url.pathname

	return {
		nav: locals.nav,
	}
}
