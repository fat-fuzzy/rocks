import {error} from '@sveltejs/kit'
import gfx from '@fat-fuzzy/gfx'

export const load = async (event) => {
	try {
		const learning = gfx.gl.sketches.learning.map((sketch) => sketch.meta)

		const projects = gfx.gl.sketches.projects.map((sketch) => sketch.meta)

		const data = {
			sketches: {
				learning,
				projects,
			},
		}

		return data
	} catch (e) {
		console.log(e)

		error(500, 'Error loading play data')
	}
}
