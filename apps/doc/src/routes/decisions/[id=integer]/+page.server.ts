import {error} from '@sveltejs/kit'
import type {PageServerLoad} from './$types'

// TODO: [fetch this from some bucket type storage] < Maybe not - fix copying of md assets into server build first
const DATA_PATH = '../../../assets/decisions/'
/**
 * Load data from markdown file based on route parameters
 * @param params Request parameters
 * @returns { title, year, rawHtml } frontmatter metadata and markdown content as a rawHtml string
 */
export const load: PageServerLoad = async ({params}) => {
	const markdown = await import(`${DATA_PATH}${params.id}.md`)
	console.log(markdown)

	if (markdown) {
		const {title, year} = markdown.metadata
		const content = await markdown.default.render().html

		return {
			title,
			year,
			content, // capitalize this to use component <rawHtml /> in +page.svelte
		}
	}
	throw error(404, 'Not found')
}
