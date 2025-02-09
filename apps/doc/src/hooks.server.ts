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
	// ui page forms
	'tokens',
	'blocks',
	'layouts',
	'recipes',
	// play page forms
	'projects',
	'learning',
]

enum FormsEnum {
	// global app forms
	nav = 'nav',
	settings = 'settings',
	sidebar = 'sidebar',
	// ui page forms
	tokens = 'tokens',
	blocks = 'blocks',
	layouts = 'layouts',
	recipes = 'recipes',
	dsState = 'dsState',
	dsStyles = 'dsStyles',
	currentTabs = 'currentTabs',
}

export const handle = (async ({event, resolve}) => {
	let {cookies} = event
	// Load all UI states into locals

	const appSettings = uiStateService.getUiState({
		cookies,
		key: `${APP_PREFIX}-settings-app`,
	})
	const dsState = uiStateService.getUiState({
		cookies,
		key: `${APP_PREFIX}-ui-state`,
	})
	const dsStyles = uiStateService.getUiState({
		cookies,
		key: `${APP_PREFIX}-ui-styles`,
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

	// UI nav
	event.locals.navTokens = appLocals[FormsEnum.tokens]
	event.locals.navBlocks = appLocals[FormsEnum.blocks]
	event.locals.navLayouts = appLocals[FormsEnum.layouts]
	event.locals.navRecipes = appLocals[FormsEnum.recipes]

	// UI state and styles
	event.locals.dsState = dsState
	event.locals.dsStyles = dsStyles

	const response = await resolve(event)
	return response
}) satisfies Handle
