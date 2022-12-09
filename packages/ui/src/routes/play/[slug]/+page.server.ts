import {sketches} from '$data/sketches'
import type {PageServerLoad} from './$types'

export const load: PageServerLoad = ({params}) => {
	const sketchData = sketches.find((s) => {
		return s.slug === params.slug
	})
	return {
		sketchData,
	}
}
