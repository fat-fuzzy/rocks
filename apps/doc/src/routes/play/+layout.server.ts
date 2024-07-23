import lib from '@fat-fuzzy/lib'
import pages from '$data/pages'

const page = 'play'

export const load = async (event) => {
	const sketches = lib.gfx.sketches.map((sketch) => sketch.meta)
	const content = await pages.fetchMarkdowns(page)

	const data = {
		sketches,
		content: content.length ? content[0] : {meta: {title: ''}},
	}

	return data
}
