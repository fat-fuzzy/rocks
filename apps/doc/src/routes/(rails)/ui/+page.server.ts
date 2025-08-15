import type {Actions} from './$types'
import uiActions from '$lib/server/actions/ui-actions'
import {commonActions} from '$lib/server/actions/page-actions'
import {playbookActions} from '$lib/server/actions/playbook-actions'

export const actions = {
	...commonActions,
	...playbookActions,
	toggleTokens: async (event) => uiActions.handleToggleTokens(event),
	toggleBlocks: async (event) => uiActions.handleToggleBlocks(event),
	toggleLayouts: async (event) => uiActions.handleToggleLayouts(event),
	toggleRecipes: async (event) => uiActions.handleToggleRecipes(event),
} satisfies Actions
