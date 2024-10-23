import {error} from '@sveltejs/kit'

export const prerender = false
export const ssr = true
/**
 * Load data from markdown file based on route parameters
 * @param params Request parameters
 * @returns { title, year, rawHtml } frontmatter metadata and markdown content as a rawHtml string
 */
export const load = async () => {
	error(404, 'Not found')
}
