import {error} from '@sveltejs/kit'
import gfx from '@fat-fuzzy/gfx'
import ui from '@fat-fuzzy/ui'

const {uiActions} = ui.actions

export const load = ({params}) => {
	let sketchData = gfx.gl.sketches.learning.find((s) => {
		return s.meta.slug === params.slug
	})

	if (!sketchData) {
		throw error(404, {message: 'Sketch not found'})
	}
	let meta = sketchData.meta

	if (!meta) {
		throw error(500, {message: 'Sketch data not found'})
	}

	return meta
}

export const actions = {
	toggleSidebar: async (event) => uiActions.handleToggleSidebar(event),
}
