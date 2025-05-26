import {actions as parentActions} from '../+page.server'

export const load = async ({params}) => {
	if (params.category === 'raw') {
		return {layout: 'voyager'}
	}
	return {layout: 'tram'}
}

export const actions = parentActions
