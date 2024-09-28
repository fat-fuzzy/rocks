import {error} from '@sveltejs/kit'
import lib from '@fat-fuzzy/lib'
import pages from '$data/pages'

const page = 'play'

export const load = async (event) => {
	try {
		const sketches = lib.gfx.sketches.map((sketch) => sketch.meta)
		let content = await pages.fetchMarkdowns(page)

		if (!content?.length) {
			throw error(404, {message: 'Not found'})
		}
		content = content[0]

		if (!content?.meta) {
			throw error(404, {message: 'Not found'})
		}

		const data = {
			sketches,
			content,
		}

		return data
	} catch (e) {
		console.log(e)

		error(500, 'Error loading play data')
	}
}
