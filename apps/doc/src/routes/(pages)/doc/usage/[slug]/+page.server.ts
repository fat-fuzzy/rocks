import {error} from '@sveltejs/kit'
import usages from '$data/usages'
import uiActions from '$lib/forms/actions/ui-actions'
import settingsActions from '$lib/forms/actions/settings-actions'

/**
 * Load data from markdown file based on route parameters
 * @param params Request parameters
 * @returns { title, year, rawHtml } frontmatter metadata and markdown content as a rawHtml string
 */
export const load = async ({parent, params}) => {
	let {sidebar} = await parent()
	const {slug} = params
	const markdowns = await usages.markdowns
	const html = markdowns?.find((v) => v.meta.slug === slug)

	if (!html) {
		error(404, 'Not found')
	}

	return {
		sidebar,
		html,
	}
}

export const actions = {
	toggleSidebar: async (event) => {
		const updated = await uiActions.handleToggleSidebar(event)
		event.locals.sidebar = updated.state
	},
	toggleSettings: async (event) => uiActions.handleToggleSettings(event),
	toggleUsage: async (event) => uiActions.handleToggleUsage(event),
	toggleDecisions: async (event) => uiActions.handleToggleDecisions(event),
	updateSettings: async (event) =>
		settingsActions.handleUpdateAppSettings({event}),
}
