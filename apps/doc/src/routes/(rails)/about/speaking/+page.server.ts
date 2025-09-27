import {error} from '@sveltejs/kit'
import pages from '$data/pages'
import {actions as parentActions} from '../+page.server'

const page = 'speaking'
const markdowns = await pages.fetchMarkdowns(page)

export const load = async ({parent}) => {
	if (!markdowns?.length) {
		error(404, {message: 'Not found'})
	}

	const content = markdowns[0]

	if (!content?.meta) {
		error(404, {message: 'Not found'})
	}

	const {sidebar} = await parent()

	return {
		sidebar,
		content,
	}
}

export const actions = parentActions
