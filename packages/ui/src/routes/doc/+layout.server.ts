import type {LayoutServerLoad} from './$types'
import markdownData from '$data/doc'

export const load = (async (event) => {
	let styles = null
	let context = null
	let sidebar = null
	if (event.locals.sidebar) {
		sidebar = JSON.parse(event.locals.sidebar)
	}
	if (event.locals.styles) {
		styles = JSON.parse(event.locals.styles)
	}
	if (event.locals.context) {
		context = JSON.parse(event.locals.context)
	}
	const markdowns = await markdownData.fetchMarkdowns()

	return {sidebar, styles, context, markdowns}
}) satisfies LayoutServerLoad
