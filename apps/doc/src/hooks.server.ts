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

enum RevealFormsEnum {
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
		key: `${APP_PREFIX}-app-settings`,
	})
	const dsState = uiStateService.getUiState({
		cookies,
		key: `${APP_PREFIX}-ui-state`,
	})
	const dsStyles = uiStateService.getUiState({
		cookies,
		key: `${APP_PREFIX}-ui-styles`,
	})

	const appLocalsPromises = revealForms.map((form) => ({
		[form]: uiStateService.getUiState({
			cookies,
			key: `${APP_PREFIX}-reveal-${form}`,
		}),
	}))

	const appLocals = await (
		await Promise.all(appLocalsPromises)
	).reduce((acc, curr) => {
		return {...acc, ...curr}
	}, {})
	event.locals.settings = appSettings
	event.locals.dsState = dsState
	event.locals.dsStyles = dsStyles

	event.locals.app = appLocals[RevealFormsEnum.settings]
	event.locals.sidebar = appLocals[RevealFormsEnum.sidebar]
	event.locals.nav = appLocals[RevealFormsEnum.nav]
	event.locals.navTokens = appLocals[RevealFormsEnum.tokens]
	event.locals.navBlocks = appLocals[RevealFormsEnum.blocks]
	event.locals.navLayouts = appLocals[RevealFormsEnum.layouts]
	event.locals.navRecipes = appLocals[RevealFormsEnum.recipes]

	const response = await resolve(event)
	return response
}) satisfies Handle
