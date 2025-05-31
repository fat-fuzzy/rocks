import {error} from '@sveltejs/kit'
import {actions as parentActions} from '../+page.server'

export const load = async ({parent, params, locals}) => {
	const {projects} = await parent()
	const meta = projects.find((s) => {
		return s.slug === params.slug
	})

	if (!meta) {
		error(404, {message: 'Sketch not found'})
	}

	const pageContext = locals.pageContext

	return {meta, pageContext, layout: 'steam'}
}

export const actions = parentActions
