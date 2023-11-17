import type {LayoutServerLoad} from './$types'
import markdownData from '$data/doc'

export const load = (async (event) => {
	let uiState = {}
	if (event.locals.uiStateData) {
		uiState = JSON.parse(event.locals.uiStateData)
	}
	const markdowns = await markdownData.fetchMarkdowns()

	return {uiState, markdowns}
}) satisfies LayoutServerLoad
