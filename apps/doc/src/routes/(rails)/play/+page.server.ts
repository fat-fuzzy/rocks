import {error} from '@sveltejs/kit'
import pages from '$data/pages'
import {commonActions} from '$lib/server/actions/page-actions'

const page = 'play'

export const load = async ({parent}) => {
	const {sidebar, pageContext} = await parent()
	const markdowns = await pages.fetchMarkdowns(page)

	if (!markdowns?.length) {
		error(404, {message: 'Not found'})
	}

	const content = markdowns[0]

	if (!content?.meta) {
		error(404, {message: 'Not found'})
	}

	return {
		sidebar,
		content,
		pageContext,
	}
}

export const actions = commonActions
