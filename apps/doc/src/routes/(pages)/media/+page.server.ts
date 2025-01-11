import {error} from '@sveltejs/kit'
import uiActions from '$lib/forms/actions/ui-actions'
import settingsActions from '$lib/forms/actions/settings-actions'

export const load = async () => {
	error(404, 'Not found')
}

export const actions = {
	toggleNav: async (event) => uiActions.handleToggleNav(event),
	toggleSettings: async (event) => uiActions.handleToggleSettings(event),
	updateSettings: async (event) =>
		settingsActions.handleUpdateAppSettings({event}),
}
