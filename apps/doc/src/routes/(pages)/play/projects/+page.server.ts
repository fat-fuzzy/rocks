import {error} from '@sveltejs/kit'
import pages from '$data/pages'
import uiActions from '$lib/forms/actions/ui-actions'

const page = 'projects'

export const load = async ({params}) => {
	let content = await pages.fetchMarkdowns(page)

	if (!content?.length) {
		throw error(404, {message: 'Not found'})
	}
	content = content[0]

	if (!content?.meta) {
		throw error(404, {message: 'Not found'})
	}
	const data = {
		content,
	}

	return data
}

export const actions = {
	toggleSidebar: async (event) => uiActions.handleToggleSidebar(event),
	toggleNav: async (event) => uiActions.handleToggleNav(event),
	toggleLearning: async (event) => uiActions.handleToggleLearning(event),
	toggleProjects: async (event) => uiActions.handleToggleProjects(event),
}
