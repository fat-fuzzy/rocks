import {error} from '@sveltejs/kit'
import blog from '$data/blog'
import {commonActions} from '$lib/forms/actions/page-actions'

/**
 * Load data from markdown file based on route parameters
 * @param params Request parameters
 * @returns post data
 */
export const load = async ({parent, params}) => {
	const {sidebar} = await parent()
	const {slug} = params
	const markdowns = blog.markdowns
	const markdown = markdowns?.find(
		(v) => v.meta.status !== 'draft' && v.meta.slug === slug,
	)

	if (!markdown) {
		error(404, 'Not found')
	}

	return {
		sidebar,
		content: {
			id: markdown.meta.id,
			html: markdown.html,
			slug: markdown.meta.slug,
			title: markdown.meta.title,
			subtitle: markdown.meta.subtitle,
			series: markdown.meta.series,
			index: markdown.meta.index,
			description:
				markdown.meta.description ??
				`Post ${markdown.meta.id}: ${markdown.meta.title}`,
			date_created: markdown.meta.date_created,
			date_updated: markdown.meta.date_updated,
		},
	}
}

export const actions = commonActions
