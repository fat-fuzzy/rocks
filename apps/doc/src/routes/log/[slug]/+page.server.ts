import {error} from '@sveltejs/kit'
import type {PageServerLoad} from './$types'
import logs from '$data/log'
/**
 * Load data from markdown file based on route parameters
 * @param params Request parameters
 * @returns { title, year, rawHtml } frontmatter metadata and markdown content as a rawHtml string
 */
export const load: PageServerLoad = async ({params}) => {
	const {slug} = params
	const markdowns = await logs.markdowns
	const html = markdowns?.find((v) => v.meta.slug === slug)

	if (!html) {
		error(404, 'Not found');
	}

	return html
}
