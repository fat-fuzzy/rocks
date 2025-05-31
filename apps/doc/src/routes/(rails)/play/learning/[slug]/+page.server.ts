import {error} from '@sveltejs/kit'
import {actions as parentActions} from '../+page.server'

export const load = async ({parent, params}) => {
	const {learning} = await parent()
	const meta = learning.find((s) => {
		return s.slug === params.slug
	})

	if (!meta) {
		error(404, {message: 'Sketch not found'})
	}

	return {meta, layout: 'steam'}
}

export const actions = parentActions
