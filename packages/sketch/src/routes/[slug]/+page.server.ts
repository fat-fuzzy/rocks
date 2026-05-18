import {error} from '@sveltejs/kit'

export const load = async ({parent, params}) => {
	const {sketches} = await parent()
	const meta = sketches.find((s) => {
		return s.slug === params.slug
	})

	if (!meta) {
		throw error(404, {message: 'Sketch not found'})
	}

	return meta
}
