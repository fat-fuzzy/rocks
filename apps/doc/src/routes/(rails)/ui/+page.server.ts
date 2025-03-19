import type {Actions} from './$types'
import uiActions from '$lib/forms/actions/ui-actions'
import {commonActions} from '$lib/forms/actions/page-actions'
import {playbookActions} from '$lib/forms/actions/playbook-actions'

export const actions = {
	...commonActions,
	...playbookActions,
	toggleTokens: async (event) => uiActions.handleToggleTokens(event),
	toggleBlocks: async (event) => uiActions.handleToggleBlocks(event),
	toggleLayouts: async (event) => uiActions.handleToggleLayouts(event),
	toggleRecipes: async (event) => uiActions.handleToggleRecipes(event),
} satisfies Actions
