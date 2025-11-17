import {error} from '@sveltejs/kit'
import pages from '$data/pages'
import uiActions from '$lib/server/actions/ui-actions'
import {commonActions} from '$lib/server/actions/page-actions'

const page = 'play'

export const load = async ({parent}) => {
	let {sidebar, pageContext} = await parent()
	let markdowns = await pages.fetchMarkdowns(page)

	if (!markdowns?.length) {
		error(404, {message: 'Not found'})
	}
	let content = markdowns[0]

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
	toggleLearning: async (event) => {
		const updated = await uiActions.handleToggleLearning(event)
		event.locals.navLearning = updated.state
	},
	toggleProjects: async (event) => {
		const updated = await uiActions.handleToggleProjects(event)
		event.locals.navProjects = updated.state
	},
}
