import blog from '$data/blog'
import pages from '$data/pages'

const page = 'blog'

export const load = async (event) => {
	const decisionsMarkdowns = await blog.markdowns
	const content = await pages.fetchMarkdowns(page)

	const data = {
		markdowns: decisionsMarkdowns.filter(({meta}) => meta.status !== 'draft'),
		// TODO: Implement a better way to handle this: HTTP error
		content: content.length ? content[0] : {meta: {title: ''}},
	}

	return data
}
