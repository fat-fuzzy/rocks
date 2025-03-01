import {error} from '@sveltejs/kit'

export const load = async ({parent, params}) => {
	let {sketches} = await parent()
	let meta = sketches.find((s) => {
		return s.slug === params.slug
	})

	if (!meta) {
		throw error(404, {message: 'Sketch not found'})
	}

	return meta
}
