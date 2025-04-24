import {actions as parentActions} from '../+page.server'

export const load = async () => {
	return {layout: 'steam'}
}

export const actions = parentActions
