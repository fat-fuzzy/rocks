import type {LayoutServerLoad} from './$types'

export const load = ((event) => {
	let uiState = {}
	if (event.locals.uiStateData) {
		uiState = JSON.parse(event.locals.uiStateData)
	}
	return {uiState}
}) satisfies LayoutServerLoad
