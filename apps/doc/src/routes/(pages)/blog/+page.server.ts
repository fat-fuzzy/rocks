import {error} from '@sveltejs/kit'
import pages from '$data/pages'
import {commonActions} from '$lib/forms/services/page-actions'

const page = 'blog'
const markdowns = await pages.fetchMarkdowns(page)

export const load = async ({parent}) => {
	let {sidebar} = await parent()
	if (!markdowns?.length) {
		throw error(404, {message: 'Not found'})
	}
	let content = markdowns[0]

	if (!content?.meta) {
		throw error(404, {message: 'Not found'})
	}

	return {
		sidebar,
		content,
	}
}

export const actions = commonActions
