import type {Handle} from '@sveltejs/kit'
import ui from '@fat-fuzzy/ui'
import uiStateService from '$lib/forms/services/ui-state'

const {APP_PREFIX} = ui.constants

const revealForms = [
	// global app forms
	'nav',
	'sidebar',
	'context',
	'appContext',
	'pageContext',
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
	appContext = 'appContext',
	pageContext = 'pageContext',
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
	const preferences = uiStateService.getUiState({
		cookies,
		key: `${APP_PREFIX}-appContext`,
	})
	const dsState = uiStateService.getUiState({
		cookies,
		key: `${APP_PREFIX}-ui-state`,
	})
	const dsStyles = uiStateService.getUiState({
		cookies,
		key: `${APP_PREFIX}-ui-styles`,
	})

	const revealPromises = revealForms.map((form) => ({
		[form]: uiStateService.getUiState({
			cookies,
			key: `${APP_PREFIX}-reveal-${form}`,
		}),
	}))

	const reveal = (await Promise.all(revealPromises)).reduce((acc, curr) => {
		return {...acc, ...curr}
	}, {})

	console.log('Hooks reveal')
	console.log(JSON.stringify(reveal))

	// Global Forms
	event.locals.nav = reveal[FormsEnum.nav]
	event.locals.sidebar = reveal[FormsEnum.sidebar]
	event.locals.appContext = {
		...reveal[FormsEnum.appContext],
		...preferences,
	}

	// UI Page Forms
	event.locals.dsState = dsState
	event.locals.dsStyles = dsStyles
	event.locals.navTokens = reveal[FormsEnum.tokens]
	event.locals.navBlocks = reveal[FormsEnum.blocks]
	event.locals.navLayouts = reveal[FormsEnum.layouts]
	event.locals.navRecipes = reveal[FormsEnum.recipes]

	const response = await resolve(event)
	return response
}) satisfies Handle
