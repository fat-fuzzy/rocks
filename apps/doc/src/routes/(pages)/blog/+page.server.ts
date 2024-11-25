import {error} from '@sveltejs/kit'
import pages from '$data/pages'
import ui from '@fat-fuzzy/ui'

const {uiActions} = ui.actions

const page = 'blog'
const markdowns = await pages.fetchMarkdowns(page)

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
	toggleSidebar: async (event) => uiActions.handleToggleSidebar(event),
}
