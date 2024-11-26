import type {Handle} from '@sveltejs/kit'

import ui from '@fat-fuzzy/ui'

const {uiStateService} = ui.services
const {DEFAULT_REVEAL_STATE, DEFAULT_APP_SETTINGS} = ui.constants

const apPrefix = 'ff'
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

	const appSettings = await uiStateService.getUiState({
		cookies,
		key: 'fat-fuzzy-app-settings',
		options: {state: DEFAULT_REVEAL_STATE},
	})
	const currentTabs = await uiStateService.getUiState({
		cookies,
		key: 'fat-fuzzy-ui-tabs',
		options: {state: DEFAULT_REVEAL_STATE},
	})
	const dsState = await uiStateService.getUiState({
		cookies,
		key: 'fat-fuzzy-ui-state',
		options: {state: DEFAULT_REVEAL_STATE},
	})
	const dsStyles = await uiStateService.getUiState({
		cookies,
		key: 'fat-fuzzy-ui-styles',
		options: {state: DEFAULT_REVEAL_STATE},
	})

	const appLocalsPromises = revealForms.map(async (form) => ({
		[form]: uiStateService.getUiState({
			cookies,
			key: `${apPrefix}-reveal-${form}`,
			options: {state: DEFAULT_REVEAL_STATE},
		}),
	}))

	const appLocals = await (
		await Promise.all(appLocalsPromises)
	).reduce((acc, curr) => {
		return {...acc, ...curr}
	}, {})

	event.locals.settings = appSettings
	event.locals.currentTabs = currentTabs
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
