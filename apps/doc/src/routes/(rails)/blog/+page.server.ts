import {error} from '@sveltejs/kit'
import pages from '#data/pages.js'
import {commonActions} from '#lib/server/actions/page-actions.js'

const page = 'blog'
const markdowns = await pages.fetchMarkdowns(page)

export const load = async ({parent}) => {
	const {sidebar} = await parent()

	if (!markdowns?.length) {
		error(404, 'Not found')
	}

	const content = markdowns[0]

	if (!content?.meta) {
		error(404, 'Not found')
	}

	return {
		sidebar,
		content,
	}
}

export const actions = commonActions
