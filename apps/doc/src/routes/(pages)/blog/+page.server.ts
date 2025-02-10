import {error} from '@sveltejs/kit'
import pages from '$data/pages'

const page = 'blog'
const markdowns = await pages.fetchMarkdowns(page)
import uiActions from '$lib/forms/actions/ui-actions'
import settingsActions from '$lib/forms/actions/settings-actions'

export const load = async (event) => {
	if (!markdowns?.length) {
		throw error(404, {message: 'Not found'})
	}
	let content = markdowns[0]

	if (!content?.meta) {
		throw error(404, {message: 'Not found'})
	}

	return {
		content,
	}
}

export const actions = {
	toggleNav: async (event) => uiActions.handleToggleNav(event),
	toggleSettings: async (event) => uiActions.handleToggleSettings(event),
	updateSettings: async (event) =>
		settingsActions.handleUpdateAppSettings({event}),
}
