import type {LayoutServerLoad} from './$types'
import {api} from '@fat-fuzzy/ui'
const {stylesStore} = api

export const load = ((event) => {
	let uiState = {}
	if (event.locals.uiStateData) {
		uiState = JSON.parse(event.locals.uiStateData)
		stylesStore.selectedStore.set(uiState)
	}
	return {uiState}
}) satisfies LayoutServerLoad
