import {error} from '@sveltejs/kit'
import gfx from '@fat-fuzzy/gfx'

export const load = ({params}) => {
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

	return meta
}
