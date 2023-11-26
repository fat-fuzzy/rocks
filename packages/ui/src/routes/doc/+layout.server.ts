import type {LayoutServerLoad} from './$types'
import markdownData from '$data/doc'

export const load = (async (event) => {
	let styles = {}
	if (event.locals.styles) {
		styles = JSON.parse(event.locals.styles)
	}
	const markdowns = await markdownData.fetchMarkdowns()

	return {styles, markdowns}
}) satisfies LayoutServerLoad
