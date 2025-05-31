import {error} from '@sveltejs/kit'
import pages from '$data/pages'
import {actions as parentActions} from '../+page.server'

const page = 'learning'

export const load = async () => {
	let content = await pages.fetchMarkdowns(page)

	if (!content?.length) {
		error(404, {message: 'Not found'})
	}
	content = content[0]

	if (!content?.meta) {
		error(404, {message: 'Not found'})
	}
	const data = {
		content,
	}

	return data
}

export const actions = parentActions
