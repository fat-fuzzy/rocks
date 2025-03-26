import type {Handle} from '@sveltejs/kit'
import ui from '@fat-fuzzy/ui'
import uiStateService from '$lib/forms/services/ui-state'

const {APP_PREFIX} = ui.constants

const revealForms = [
	// global app forms
	'nav',
	'sidebar',
	'context',
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
	appContext = 'app-context',
	sidebar = 'sidebar',
	context = 'context',
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
	const appContext = uiStateService.getUiState({
		cookies,
		key: `${APP_PREFIX}-context`,
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

	// Global Forms
	event.locals.nav = appLocals[FormsEnum.nav]
	event.locals.sidebar = appLocals[FormsEnum.sidebar]
	event.locals.context = appContext
	event.locals.context.reveal = appLocals[FormsEnum.appContext]

	// UI Page Forms
	event.locals.dsState = dsState
	event.locals.dsStyles = dsStyles
	event.locals.navTokens = appLocals[FormsEnum.tokens]
	event.locals.navBlocks = appLocals[FormsEnum.blocks]
	event.locals.navLayouts = appLocals[FormsEnum.layouts]
	event.locals.navRecipes = appLocals[FormsEnum.recipes]

	const response = await resolve(event)
	return response
}) satisfies Handle
