import {error} from '@sveltejs/kit'
import {actions as parentActions} from '../+page.server'

export const load = async ({parent, params}) => {
	let {projects} = await parent()
	let meta = projects.find((s) => {
		return s.slug === params.slug
	})

	if (!meta) {
		throw error(404, {message: 'Sketch not found'})
	}

	return meta
}

export const actions = parentActions
