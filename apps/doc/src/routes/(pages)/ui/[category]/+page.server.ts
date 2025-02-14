import {fail, redirect} from '@sveltejs/kit'

import ui from '@fat-fuzzy/ui'
import {forms} from '@fat-fuzzy/playbook'
import uiActions from '$lib/forms/actions/ui-actions'
import {commonActions} from '$lib/forms/services/page-actions'

const {DsStateUpdate} = forms
const {DEFAULT_DS_STATE} = ui.constants

export const load = async ({parent}) => {
	const {sidebar} = await parent()
	return {
		sidebar,
	}
}

export const actions = {
	...commonActions,
	toggleTokens: async (event) => uiActions.handleToggleTokens(event),
	toggleBlocks: async (event) => uiActions.handleToggleBlocks(event),
	toggleLayouts: async (event) => uiActions.handleToggleLayouts(event),
	toggleRecipes: async (event) => uiActions.handleToggleRecipes(event),
	updateState: async ({request, url, cookies}) => {
		const data = await request.formData()
		const serialized = cookies.get('ff-ui-state')
		let currentState = DEFAULT_DS_STATE
		if (serialized) {
			currentState = JSON.parse(serialized)
		}
		const state = new DsStateUpdate(currentState)
		if (!state.enter(data)) {
			return fail(400, {stylesError: true})
		}
		cookies.set('ff-ui-state', state.toString(), {path: '/'})
		if (url.searchParams.has('redirectTo')) {
			const redirectTo = url.searchParams.get('redirectTo') ?? url.pathname
			redirect(303, redirectTo)
		}

		return {success: true}
	},
}
