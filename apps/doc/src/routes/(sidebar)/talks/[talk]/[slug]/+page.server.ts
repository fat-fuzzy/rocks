import {error} from '@sveltejs/kit'
import slides from '$data/talks'
import {commonActions} from '$lib/server/actions/page-actions'

/**
 * Load data from markdown file based on route parameters
 * @param params Request parameters
 * @returns post data
 */
export const load = async ({params}) => {
	const {talk, slug} = params
	let markdowns = await slides.fetchMarkdowns(talk)
	const markdown = markdowns.find(
		(v) => v.meta.status !== 'draft' && v.meta.slug === slug,
	)

	if (!markdown) {
		error(404, 'Not found')
	}

	return {
		markdowns,
		content: {
			...markdown,
		},
	}
}

export const actions = commonActions
