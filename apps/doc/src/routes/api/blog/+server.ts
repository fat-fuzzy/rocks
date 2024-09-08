import {error, json} from '@sveltejs/kit'
import blog from '$data/blog'
import pages from '$data/pages'

const page = 'blog'

export async function GET(slug) {
	const posts = await blog.markdowns

	if (!slug) {
		throw error(404, {message: 'Not found'})
	}

	const content = await pages.fetchMarkdowns(page)

	if (!content?.meta) {
		throw error(404, {message: 'Not found'})
	}

	const data = {
		markdowns: posts.filter(({meta}) => meta.status !== 'draft'),
		content,
	}

	return json(data)
}
