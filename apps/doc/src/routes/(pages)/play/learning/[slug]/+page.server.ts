import {actions as parentActions} from '../+page.server'

export const load = async ({parent, params}) => {
	let {sidebar, projects} = await parent()
	let meta = projects.find((s) => {
		return s.slug === params.slug
	})
	return {
		sidebar,
		meta,
	}
}

export const actions = parentActions
