import {error} from '@sveltejs/kit'
import type {PageServerLoad} from './$types'
import decisionsHtml from '$data/decisions'
/**
 * Load data from markdown file based on route parameters
 * @param params Request parameters
 * @returns { title, year, rawHtml } frontmatter metadata and markdown content as a rawHtml string
 */
export const load: PageServerLoad = async ({params}) => {
	const {id} = params

	const html = decisionsHtml.find((v) => v.path === id)
	if (!html) {
		throw error(404, 'Not found')
	}

	return html
}
