// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false
export const ssr = true

export const load = async ({locals, url}) => {
	// Main header nav
	locals.nav.actionPath = url.pathname
	locals.appContext.actionPath = url.pathname

	return {
		nav: locals.nav,
		appContext: locals.appContext,
	}
}
