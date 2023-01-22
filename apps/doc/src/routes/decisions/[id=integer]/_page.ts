import {error} from '@sveltejs/kit'
import type {PageLoad} from './$types'
import markdown from '@fat-fuzzy/markdown'

// TODO: [fetch this from some bucket type storage] < Maybe not - fix copying of md assets into server build first
const DATA_PATH = '../../../assets/decisions/'
/**
 * Load data from markdown file based on route parameters
 * @param params Request parameters
 * @returns { title, year, Content } frontmatter metadata and a Content svelte component that renders the contents of the file
 */
export const load: PageLoad = async ({params}) => {
	const markdown = await import(`${DATA_PATH}${params.id}.md`)

	if (markdown) {
		const {title, year} = markdown.metadata
		const Content = markdown.default

		return {
			title,
			year,
			Content, // capitalize this to use component <Content /> in +page.svelte
		}
	}
	throw error(404, 'Not found')
}
