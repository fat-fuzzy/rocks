import {error} from '@sveltejs/kit'
import pages from '$data/pages'
import {actions as parentActions} from '../+page.server'

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

export const actions = parentActions
