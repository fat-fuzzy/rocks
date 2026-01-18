import {error, json} from '@sveltejs/kit'
import blog from '$data/blog'
import pages from '$data/pages'

const page = 'blog'

export async function GET() {
	const posts = blog.markdowns.filter(({meta}) => meta.status !== 'draft')

	const content = await pages.fetchMarkdowns(page)

	if (!content || !content[0].meta) {
		error(404, {message: 'Not found'})
	}

	const data = {
		markdowns: posts,
		content,
	}

	return json(data)
}
