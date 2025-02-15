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
	const {locals, cookies, url} = event
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

	// LayoutSidebar nav
	locals.sidebar = appLocals[FormsEnum.sidebar]

	locals.settings = appSettings

	const response = await resolve(event)
	return response
}) satisfies Handle
