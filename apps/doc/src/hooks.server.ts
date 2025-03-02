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
}

export const handle = (async ({event, resolve}) => {
	let {cookies} = event
	// Load all UI states into locals
	const appSettings = uiStateService.getUiState({
		cookies,
		key: `${APP_PREFIX}-settings`,
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

	const appLocals = (await Promise.all(appLocalsPromises)).reduce(
		(acc, curr) => {
			return {...acc, ...curr}
		},
		{},
	)

	event.locals.settings = appSettings
	event.locals.dsState = dsState
	event.locals.dsStyles = dsStyles
	event.locals.sidebar = appLocals[FormsEnum.sidebar]
	event.locals.nav = appLocals[FormsEnum.nav]
	event.locals.navTokens = appLocals[FormsEnum.tokens]
	event.locals.navBlocks = appLocals[FormsEnum.blocks]
	event.locals.navLayouts = appLocals[FormsEnum.layouts]
	event.locals.navRecipes = appLocals[FormsEnum.recipes]

	const response = await resolve(event)
	return response
}) satisfies Handle
