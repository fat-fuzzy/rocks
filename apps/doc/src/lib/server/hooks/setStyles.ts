import type {Handle} from '@sveltejs/kit'

import ui from '@fat-fuzzy/ui'
import uiStateService from '$lib/server/services/session'

const {APP_PREFIX} = ui.constants

const revealForms = [
	// global app forms
	'nav',
	'sidebar',
	'appContext',
	'pageContext',
	// about page forms
	'usage',
	'decisions',
	'speaking',
	// ui page forms
	'tokens',
	'blocks',
	'layouts',
	'recipes',
	'raw',
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
	// ui page forms
	tokens = 'tokens',
	blocks = 'blocks',
	layouts = 'layouts',
	recipes = 'recipes',
	raw = 'raw',
	dsState = 'dsState',
	dsStyles = 'dsStyles',
	// about page forms
	decisions = 'decisions',
	usage = 'usage',
	speaking = 'speaking',
	// play page forms,
	learning = 'learning',
	projects = 'projects',
}

export const setStyles =
	(): Handle =>
	async ({event, resolve}) => {
		const {cookies} = event
		// Load all UI states into locals
		const preferences = uiStateService.getUiState({
			cookies,
			key: `${APP_PREFIX}-preferences`,
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

		// Global Forms
		event.locals.nav = reveal[FormsEnum.nav]
		event.locals.sidebar = reveal[FormsEnum.sidebar]
		event.locals.appContext = {
			...preferences,
			...reveal[FormsEnum.appContext],
		}
		event.locals.pageContext = reveal[FormsEnum.pageContext]
		// UI Page Forms
		event.locals.dsState = dsState
		event.locals.dsStyles = dsStyles
		event.locals.navTokens = reveal[FormsEnum.tokens]
		event.locals.navBlocks = reveal[FormsEnum.blocks]
		event.locals.navLayouts = reveal[FormsEnum.layouts]
		event.locals.navRecipes = reveal[FormsEnum.recipes]
		event.locals.navRaw = reveal[FormsEnum.raw]
		// About Page Forms
		event.locals.navDecisions = reveal[FormsEnum.decisions]
		event.locals.navUsage = reveal[FormsEnum.usage]
		event.locals.navSpeaking = reveal[FormsEnum.speaking]
		// Play Page Forms
		event.locals.navLearning = reveal[FormsEnum.learning]
		event.locals.navProjects = reveal[FormsEnum.projects]

		return resolve(event)
	}
