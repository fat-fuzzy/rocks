import type {Actions} from './$types'
import uiActions from '$lib/server/actions/ui-actions'
import {commonActions} from '$lib/server/actions/page-actions'
import {playbookActions} from '$lib/server/actions/playbook-actions'

export const actions = {
	...commonActions,
	...playbookActions,
	toggleTokens: async (event) => {
		const updated = await uiActions.handleToggleTokens(event)
		event.locals.navTokens = updated.state
	},
	toggleBlocks: async (event) => {
		const updated = await uiActions.handleToggleBlocks(event)
		event.locals.navBlocks = updated.state
	},
	toggleLayouts: async (event) => {
		const updated = await uiActions.handleToggleLayouts(event)
		event.locals.navLayouts = updated.state
	},
	toggleRecipes: async (event) => {
		const updated = await uiActions.handleToggleRecipes(event)
		event.locals.navRecipes = updated.state
	},
	toggleRaw: async (event) => {
		const updated = await uiActions.handleToggleRaw(event)
		event.locals.navRaw = updated.state
	},
} satisfies Actions
