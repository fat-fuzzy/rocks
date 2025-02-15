import ui from '@fat-fuzzy/ui'
import uiStateService from '$lib/forms/services/ui-state'

const {APP_PREFIX} = ui.constants

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false
export const ssr = true

export const load = async ({locals, url}) => {
	locals.nav.actionPath = url.pathname
	locals.sidebar.actionPath = url.pathname
	locals.settings.actionPath = url.pathname

	return {
		nav: locals.nav,
		settings: locals.settings,
		sidebar: locals.sidebar,
	}
}
