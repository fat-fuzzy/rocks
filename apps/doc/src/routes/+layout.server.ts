import ui from '@fat-fuzzy/ui'
import uiStateService from '$lib/forms/services/ui-state'

const {APP_PREFIX} = ui.constants

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false
export const ssr = true

export const load = async ({locals, cookies, url}) => {
	const appSettings = uiStateService.getUiState({
		cookies,
		key: `${APP_PREFIX}-settings`,
	})

	locals.settings = appSettings
	locals.settings.actionPath = url.pathname

	return {
		nav: locals.nav,
		styles: locals.styles,
		settings: locals.settings,
	}
}
