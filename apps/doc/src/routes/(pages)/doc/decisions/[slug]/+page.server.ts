import {error} from '@sveltejs/kit'
import decisions from '$data/decisions'
import {actions as parentActions} from '../+page.server'

/**
 * Load data from markdown file based on route parameters
 * @param params Request parameters
 * @returns { title, year, rawHtml } frontmatter metadata and markdown content as a rawHtml string
 */
export const load = async ({parent, params}) => {
	let {sidebar} = await parent()
	const {slug} = params
	const markdowns = await decisions.markdowns
	const html = markdowns?.find((v) => v.meta.slug === slug)

	if (!html) {
		error(404, 'Not found')
	}

	return {
		sidebar,
		html,
	}
}

export const actions = parentActions
