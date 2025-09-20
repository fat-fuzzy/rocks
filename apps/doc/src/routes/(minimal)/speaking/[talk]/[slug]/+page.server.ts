import {error} from '@sveltejs/kit'
import {commonActions} from '$lib/server/actions/page-actions'

/**
 * Load data from markdown file based on route parameters
 * @param params Request parameters
 * @returns post data
 */
export const load = async ({params, parent}) => {
	const {slug} = params
	const {talks, speakerNotes} = await parent()
	const markdown = talks.find(
		(v) => v.meta.status !== 'draft' && v.meta.slug === slug,
	)
	const notes = speakerNotes?.find((p) => p.meta.slug === slug)

	if (!markdown) {
		error(404, 'Not found')
	}

	return {
		notes,
		content: {
			...markdown,
		},
	}
}

export const actions = commonActions
