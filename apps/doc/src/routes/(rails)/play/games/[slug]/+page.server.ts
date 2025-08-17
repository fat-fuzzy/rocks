import {error} from '@sveltejs/kit'
import {actions as parentActions} from '../+page.server'
import projectsMarkdowns from '$data/projects'

export const load = async ({parent, params, locals}) => {
	const {projects} = await parent()

	const {slug} = params
	const meta = projects.find((s) => {
		return s.slug === slug
	})

	const markdowns = projectsMarkdowns.markdowns
	const content = markdowns?.find((v) => v.meta.slug === slug)

	if (!content && !meta) {
		error(404, {message: 'Sketch not found'})
	}

	const pageContext = locals.pageContext

	return {html: content?.html, meta, pageContext, layout: 'steam'}
}

export const actions = parentActions
