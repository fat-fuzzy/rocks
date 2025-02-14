import ui from '@fat-fuzzy/ui'
import uiStateService from '$lib/forms/services/ui-state'

const {APP_PREFIX} = ui.constants

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false
export const ssr = true

const revealForms = [
	// global app forms
	'nav',
	'sidebar',
	// doc page forms
	'usage',
	'decisions',
	// play page forms
	'projects',
	'learning',
]

enum FormsEnum {
	// global app forms
	nav = 'nav',
	settings = 'settings',
	sidebar = 'sidebar',
}

export const load = async ({locals, cookies, url}) => {
	const appSettings = uiStateService.getUiState({
		cookies,
		key: `${APP_PREFIX}-settings`,
	})

	// Load all UI states into locals
	const appLocalsMap = revealForms.map((form) => ({
		[form]: uiStateService.getUiState({
			cookies,
			key: `${APP_PREFIX}-reveal-${form}`,
		}),
	}))

	const appLocals = appLocalsMap.reduce((acc, curr) => {
		return {...acc, ...curr}
	}, {})
	// Main header nav
	locals.nav = appLocals[FormsEnum.nav]
	locals.nav.actionPath = url.pathname

	// LayoutSidebar nav
	locals.sidebar = appLocals[FormsEnum.sidebar]

	locals.settings = appSettings
	locals.settings.actionPath = url.pathname

	return {
		nav: locals.nav,
		settings: locals.settings,
	}
}
