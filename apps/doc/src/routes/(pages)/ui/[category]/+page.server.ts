import {actions as parentActions} from '../+page.server'

export const load = async ({parent}) => {
	const {sidebar} = await parent()
	return {
		sidebar,
	}
}

export const actions = parentActions
