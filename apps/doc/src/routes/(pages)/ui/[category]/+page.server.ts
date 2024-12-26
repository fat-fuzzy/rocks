import {fail, redirect} from '@sveltejs/kit'

import ui from '@fat-fuzzy/ui'
import {forms} from '@fat-fuzzy/playbook'
import settingsActions from '$lib/forms/actions/settings-actions'
import uiActions from '$lib/forms/actions/ui-actions'

const {DsStateUpdate} = forms
const {DEFAULT_DS_STATE} = ui.constants

export const actions = {
	toggleNav: async (event) => uiActions.handleToggleNav(event),
	toggleSidebar: async (event) => uiActions.handleToggleSidebar(event),
	toggleSettings: async (event) => uiActions.handleToggleSettings(event),
	toggleTokens: async (event) => uiActions.handleToggleTokens(event),
	toggleBlocks: async (event) => uiActions.handleToggleBlocks(event),
	toggleLayouts: async (event) => uiActions.handleToggleLayouts(event),
	toggleRecipes: async (event) => uiActions.handleToggleRecipes(event),
	updateSettings: async (event) =>
		settingsActions.handleUpdateAppSettings({event}),
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
