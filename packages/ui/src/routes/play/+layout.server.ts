import {sketches} from '$data/sketches'
import type {LayoutLoad} from './$types'

export const load: LayoutLoad = () => {
	console.log('LayoutLoad - sketches')
	console.log(sketches)

	return {
		sketches,
	}
}
