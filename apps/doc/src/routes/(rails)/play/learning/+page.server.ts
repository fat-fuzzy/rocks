import {error} from '@sveltejs/kit'
import pages from '$data/pages'
import {actions as parentActions} from '../+page.server'

const page = 'learning'

export const load = async () => {
	const markdowns = await pages.fetchMarkdowns(page)

	if (!markdowns?.length) {
		error(404, {message: 'Not found'})
	}
	const content = markdowns[0]

	if (!content?.meta) {
		error(404, {message: 'Not found'})
	}

	return {
		content,
		layout: 'tram',
	}
}

export const actions = parentActions
