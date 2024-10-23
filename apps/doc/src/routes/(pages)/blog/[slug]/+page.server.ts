import {error} from '@sveltejs/kit'
import blog from '$data/blog'

/**
 * Load data from markdown file based on route parameters
 * @param params Request parameters
 * @returns post data
 */
export const load = async ({params}) => {
	const {slug} = params
	const markdowns = await blog.markdowns
	const markdown = markdowns?.find(
		(v) => v.meta.status !== 'draft' && v.meta.slug === slug,
	)

	if (!markdown) {
		error(404, 'Not found')
	}

	return {
		id: markdown.meta.id,
		html: markdown.html,
		title: markdown.meta.title,
		subtitle: markdown.meta.subtitle,
		series: markdown.meta.series,
		index: markdown.meta.index,
		description:
			markdown.meta.description ??
			`Post ${markdown.meta.id}: ${markdown.meta.title}`,
		date_created: markdown.meta.date_created,
		date_updated: markdown.meta.date_updated,
	}
}
