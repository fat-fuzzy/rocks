import type {LayoutServerLoad} from './$types'
import markdownData from '$data/doc'

export const load = (async (event) => {
	let styles = {}
	if (event.locals.stylesData) {
		styles = JSON.parse(event.locals.stylesData)
	}
	const markdowns = await markdownData.fetchMarkdowns()

	return {styles, markdowns}
}) satisfies LayoutServerLoad
