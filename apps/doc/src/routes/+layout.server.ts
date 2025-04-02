// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false
export const ssr = true

export const load = async ({locals, url}) => {
	// Main header nav
	let nav = locals.nav
	nav.reveal = locals.nav.reveal ?? nav.reveal
	nav.actionPath = url.pathname

	return {
		nav: locals.nav,
		appContext: locals.appContext,
	}
}
