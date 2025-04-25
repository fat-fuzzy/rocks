import {actions as parentActions} from '../+page.server'

export const load = async () => {
	return {layout: 'tram'}
}

export const actions = parentActions
