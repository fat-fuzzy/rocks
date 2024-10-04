import {error} from '@sveltejs/kit'
import gfx from '@fat-fuzzy/gfx'

export const load = async (event) => {
	try {
		const study = gfx.gl.sketches.study.map((sketch) => sketch.meta)

		const projects = gfx.gl.sketches.projects.map((sketch) => sketch.meta)

		const data = {
			sketches: {
				study,
				projects,
			},
		}

		return data
	} catch (e) {
		console.log(e)

		error(500, 'Error loading play data')
	}
}
