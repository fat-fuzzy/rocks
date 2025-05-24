import {error} from '@sveltejs/kit'
import {actions as parentActions} from '../+page.server'

export const load = async ({params}) => {
	if (params.category !== 'raw' || !params.component) {
		error(404, 'Not found')
	}

	return {layout: 'tram'}
}

export const actions = parentActions
