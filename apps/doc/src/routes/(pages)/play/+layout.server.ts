import {error} from '@sveltejs/kit'
import gfx from '@fat-fuzzy/gfx'

export const load = async (event) => {
	try {
		const sketches = gfx.gl.sketches.map((sketch) => sketch.meta)

		const study = sketches.filter(({categories}) =>
			categories.includes('study'),
		)
		const experiments = sketches.filter(({categories}) =>
			categories.includes('experiment'),
		)

		const data = {
			sketches: {
				study,
				experiments,
			},
		}

		return data
	} catch (e) {
		console.log(e)

		error(500, 'Error loading play data')
	}
}
