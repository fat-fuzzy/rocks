import {error} from '@sveltejs/kit'
import gfx from '@fat-fuzzy/gfx'
import uiActions from '$lib/forms/actions/ui-actions'
import {commonActions} from '$lib/forms/services/page-actions'

export const load = async ({parent, params}) => {
	let {sidebar} = await parent()
	let sketchData = gfx.gl.sketches.projects.find((s) => {
		return s.meta.slug === params.slug
	})

	if (!sketchData) {
		throw error(404, {message: 'Sketch not found'})
	}
	let meta = sketchData.meta

	if (!meta) {
		throw error(500, {message: 'Sketch data not found'})
	}

	return {
		sidebar,
		meta,
	}
}

export const actions = {
	...commonActions,
	toggleLearning: async (event) => uiActions.handleToggleLearning(event),
	toggleProjects: async (event) => uiActions.handleToggleProjects(event),
}
