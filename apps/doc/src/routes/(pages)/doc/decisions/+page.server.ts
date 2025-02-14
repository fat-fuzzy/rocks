import uiActions from '$lib/forms/actions/ui-actions'
import {commonActions} from '$lib/forms/services/page-actions'

export const load = async ({parent}) => {
	let {sidebar} = await parent()
	return {
		sidebar,
	}
}

export const actions = {
	...commonActions,
	toggleUsage: async (event) => uiActions.handleToggleUsage(event),
	toggleDecisions: async (event) => uiActions.handleToggleDecisions(event),
}
