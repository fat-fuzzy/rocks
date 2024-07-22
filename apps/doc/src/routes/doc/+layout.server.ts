import decisions from '$data/decisions'
import usages from '$data/usages'
import pages from '$data/pages'

const page = 'doc'

export const load = async (event) => {
	const decisionsMarkdowns = await decisions.markdowns
	const usagesMarkdowns = await usages.markdowns
	const content = await pages.fetchMarkdowns(page)

	const data = {
		markdowns: {
			decisions: decisionsMarkdowns.filter(({meta}) => meta.status !== 'draft'),
			usages: usagesMarkdowns
				.filter(({meta}) => meta.status !== 'draft')
				.reverse(),
		},
		// TODO: Implement a better way to handle this
		content: content.length ? content[0] : {meta: {title: ''}},
	}

	return data
}
