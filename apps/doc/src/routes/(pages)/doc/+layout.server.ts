import {error} from '@sveltejs/kit'
import decisions from '$data/decisions'
import usages from '$data/usages'
import pages from '$data/pages'

const page = 'doc'

export const load = async (event) => {
	const decisionsMarkdowns = await decisions.markdowns
	const usagesMarkdowns = await usages.markdowns
	let content = await pages.fetchMarkdowns(page)

	if (!content?.length) {
		throw error(404, {message: 'Not found'})
	}
	content = content[0]

	if (!content?.meta) {
		throw error(404, {message: 'Not found'})
	}

	const data = {
		markdowns: {
			decisions: decisionsMarkdowns.filter(({meta}) => meta.status !== 'draft'),
			usages: usagesMarkdowns
				.filter(({meta}) => meta.status !== 'draft')
				.reverse(),
		},
		content,
	}

	return data
}
