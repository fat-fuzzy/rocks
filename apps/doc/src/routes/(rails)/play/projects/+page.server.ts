import {error} from '@sveltejs/kit'
import pages from '#data/pages.js'
import {actions as parentActions} from '../+page.server'

const page = 'projects'

export const load = async () => {
	const markdowns = await pages.fetchMarkdowns(page)

	if (!markdowns?.length) {
		error(404, 'Not found')
	}
	const content = markdowns[0]

	if (!content?.meta) {
		error(404, 'Not found')
	}

	return {
		content,
		layout: 'tram',
	}
}

export const actions = parentActions
