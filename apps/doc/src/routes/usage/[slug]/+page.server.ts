import {error} from '@sveltejs/kit'
import type {PageServerLoad} from './$types'
import usageData from '$data/usage'
/**
 * Load data from markdown file based on route parameters
 * @param params Request parameters
 * @returns { title, year, rawHtml } frontmatter metadata and markdown content as a rawHtml string
 */
export const load: PageServerLoad = async ({params}) => {
	const {slug} = params
	const usages = await usageData.fetchMarkdowns()
	const html = usages?.find((v) => v.meta.slug === slug)

	if (!html) {
		throw error(404, 'Not found')
	}

	return html
}
