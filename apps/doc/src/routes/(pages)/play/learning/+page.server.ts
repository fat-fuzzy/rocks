import {error} from '@sveltejs/kit'
import pages from '$data/pages'
import uiActions from '$lib/forms/actions/ui-actions'
import {commonActions} from '$lib/forms/services/page-actions'

const page = 'learning'

export const load = async ({parent}) => {
	let {sidebar} = await parent()
	let content = await pages.fetchMarkdowns(page)

	if (!content?.length) {
		throw error(404, {message: 'Not found'})
	}
	content = content[0]

	if (!content?.meta) {
		throw error(404, {message: 'Not found'})
	}
	const data = {
		sidebar,
		content,
	}

	return data
}

export const actions = {
	...commonActions,
	toggleLearning: async (event) => uiActions.handleToggleLearning(event),
	toggleProjects: async (event) => uiActions.handleToggleProjects(event),
}
