import {error} from '@sveltejs/kit'
import decisions from '$data/decisions'

/**
 * Load data from markdown file based on route parameters
 * @param params Request parameters
 * @returns { title, year, rawHtml } frontmatter metadata and markdown content as a rawHtml string
 */
export const load = async ({params}) => {
	const {slug} = params
	const markdowns = await decisions.markdowns
	const html = markdowns?.find((v) => v.meta.slug === slug)

	if (!html) {
		error(404, 'Not found')
	}

	return html
}
