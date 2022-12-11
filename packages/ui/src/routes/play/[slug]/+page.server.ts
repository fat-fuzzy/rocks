import {sketches} from '$data/sketches'

import type {PageLoad} from './$types'

export const load: PageLoad = ({params}) => {
	const sketchData = sketches.find((s) => {
		return s.slug === params.slug
	})

	const {title, dimensions, id} = sketchData
	return {
		title,
		dimensions,
		id,
	}
}
