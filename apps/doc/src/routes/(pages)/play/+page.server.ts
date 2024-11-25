import {error} from '@sveltejs/kit'
import pages from '$data/pages'
import ui from '@fat-fuzzy/ui'

const {uiActions} = ui.actions

const page = 'play'

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
}
