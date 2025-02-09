import type {Handle} from '@sveltejs/kit'
import ui from '@fat-fuzzy/ui'
import uiStateService from '$lib/forms/services/ui-state'

const {APP_PREFIX} = ui.constants

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

export const handle = (async ({event, resolve}) => {
	let {cookies} = event
	// Load all UI states into locals

	const appSettings = uiStateService.getUiState({
		cookies,
		key: `${APP_PREFIX}-settings-app`,
	})

	const appLocalsMap = revealForms.map((form) => ({
		[form]: uiStateService.getUiState({
			cookies,
			key: `${APP_PREFIX}-reveal-${form}`,
		}),
	}))

	const appLocals = appLocalsMap.reduce((acc, curr) => {
		return {...acc, ...curr}
	}, {})

	// App settings
	event.locals.settings = appSettings

	// Main header nav
	event.locals.nav = appLocals[FormsEnum.nav]

	// LayoutSidebar nav
	event.locals.sidebar = appLocals[FormsEnum.sidebar]

	const response = await resolve(event)
	return response
}) satisfies Handle
