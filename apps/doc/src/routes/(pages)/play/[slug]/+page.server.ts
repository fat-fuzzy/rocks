import {error} from '@sveltejs/kit'
import gfx from '@fat-fuzzy/gfx'

export const load = ({params}) => {
	let sketchData = gfx.gl.sketches.find((s) => {
		return s.meta.slug === params.slug
	})

	if (!sketchData) {
		throw error(404, {message: 'Not found'})
	}
	let meta = sketchData.meta

	if (!meta) {
		throw error(404, {message: 'Not found'})
	}

	return meta
}
