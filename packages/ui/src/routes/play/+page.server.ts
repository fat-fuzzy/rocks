import {sketches} from '../../../data/sketches'
import type {PageServerLoad} from './$types'

export const load: PageServerLoad = () => {
	return {
		sketches,
	}
}
