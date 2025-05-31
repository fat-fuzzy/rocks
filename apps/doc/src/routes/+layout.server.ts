import ui from '@fat-fuzzy/ui'

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false
export const ssr = true

const {DEFAULT_NAV_REVEAL_STATE} = ui.constants

export const load = async ({locals, url}) => {
	// Main header nav
	const nav = locals.nav
	nav.actionPath = url.pathname
	nav.reveal = nav.reveal ?? DEFAULT_NAV_REVEAL_STATE.reveal

	const appContext = locals.appContext
	appContext.actionPath = url.pathname

	return {
		nav,
		appContext,
	}
}
