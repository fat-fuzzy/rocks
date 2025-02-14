import {error} from '@sveltejs/kit'
import gfx from '@fat-fuzzy/gfx'
import {actions as parentActions} from '../+page.server'

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

export const actions = parentActions
