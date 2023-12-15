import type {LayoutServerLoad} from './$types'
import markdownData from '$data/doc'

export const load = (async (event) => {
	let dsStyles = null
	let dsContext = null
	let dsState = null
	let sidebar = null

	if (event.locals.dsStyles) {
		dsStyles = JSON.parse(event.locals.dsStyles)
	}
	if (event.locals.dsContext) {
		dsContext = JSON.parse(event.locals.dsContext)
	}
	if (event.locals.dsState) {
		dsState = JSON.parse(event.locals.dsState)
	}
	if (event.locals.sidebar) {
		sidebar = JSON.parse(event.locals.sidebar)
	}
	const markdowns = await markdownData.fetchMarkdowns()

	return {sidebar, dsStyles, dsContext, dsState, markdowns}
}) satisfies LayoutServerLoad
