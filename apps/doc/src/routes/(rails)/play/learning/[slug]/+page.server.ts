import {error} from '@sveltejs/kit'
import {actions as parentActions} from '../+page.server'

export const load = async ({parent, params}) => {
	let {learning} = await parent()
	let meta = learning.find((s) => {
		return s.slug === params.slug
	})

	if (!meta) {
		throw error(404, {message: 'Sketch not found'})
	}
	meta
	return {meta, layout: 'steam'}
}

export const actions = parentActions
