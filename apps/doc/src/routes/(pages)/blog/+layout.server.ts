import {error} from '@sveltejs/kit'
import blog from '$data/blog'
import pages from '$data/pages'

const page = 'blog'

export const load = async (event) => {
	const posts = await blog.markdowns
	let content = await pages.fetchMarkdowns(page)

	if (!content?.length) {
		throw error(404, {message: 'Not found'})
	}
	content = content[0]

	if (!content?.meta) {
		throw error(404, {message: 'Not found'})
	}

	const data = {
		markdowns: posts.filter(({meta}) => meta.status !== 'draft'),
		content,
	}

	return data
}
