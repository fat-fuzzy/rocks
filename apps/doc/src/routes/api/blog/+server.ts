import {error} from '@sveltejs/kit'
import blog from '#data/blog.js'
import pages from '#data/pages.js'

const page = 'blog'

export async function GET() {
	const posts = blog.markdowns.filter(({meta}) => meta.status !== 'draft')

	const content = await pages.fetchMarkdowns(page)

	if (!content || !content[0].meta) {
		error(404, 'Not found')
	}

	const data = {
		markdowns: posts,
		content,
	}

	return Response.json(data)
}
