import {error} from '@sveltejs/kit'
import pages from '$data/pages'

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false

const page = 'blog'
const markdowns = await pages.fetchMarkdowns(page)

export const load = async (event) => {
	if (!markdowns?.length) {
		throw error(404, {message: 'Not found'})
	}
	let content = markdowns[0]

	if (!content?.meta) {
		throw error(404, {message: 'Not found'})
	}

	return {
		content,
	}
}
