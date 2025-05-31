import {error, json} from '@sveltejs/kit'
import blog from '$data/blog'
import pages from '$data/pages'

const page = 'blog'

export async function GET({url}) {
	const posts = blog.markdowns.filter(({meta}) => meta.status !== 'draft')

	// TODO: This would be a call to an external API or database
	const content = await pages.fetchMarkdowns(page)

	if (!content?.meta) {
		error(404, {message: 'Not found'})
	}

	const data = {
		markdowns: posts,
		content,
	}

	return json(data)
}
