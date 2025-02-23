import type {Actions} from './$types'

import uiActions from '$lib/forms/actions/ui-actions'
import {commonActions} from '$lib/forms/services/page-actions'
import {playbookActions} from '$lib/forms/services/playbook-actions'

export const load = async ({parent, locals}) => {
	console.log('Page load locals.dsState ', locals.dsState)
	const {sidebar} = await parent()
	return {
		sidebar,
		ui: locals.dsState,
	}
}

export const actions = {
	...commonActions,
	...playbookActions,
	toggleTokens: async (event) => uiActions.handleToggleTokens(event),
	toggleBlocks: async (event) => uiActions.handleToggleBlocks(event),
	toggleLayouts: async (event) => uiActions.handleToggleLayouts(event),
	toggleRecipes: async (event) => uiActions.handleToggleRecipes(event),
} satisfies Actions
