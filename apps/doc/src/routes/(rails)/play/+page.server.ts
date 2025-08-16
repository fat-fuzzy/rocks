import {error} from '@sveltejs/kit'
import pages from '$data/pages'
import uiActions from '$lib/server/actions/ui-actions'
import {commonActions} from '$lib/server/actions/page-actions'

const page = 'play'

export const load = async ({parent}) => {
	let {sidebar, pageContext} = await parent()
	let content = await pages.fetchMarkdowns(page)

	if (!content?.length) {
		error(404, {message: 'Not found'})
	}
	content = content[0]

	if (!content?.meta) {
		error(404, {message: 'Not found'})
	}

	return {
		sidebar,
		content,
		pageContext,
	}
}

export const actions = {
	...commonActions,
	toggleLearning: async (event) => uiActions.handleToggleLearning(event),
	toggleProjects: async (event) => uiActions.handleToggleProjects(event),
}
