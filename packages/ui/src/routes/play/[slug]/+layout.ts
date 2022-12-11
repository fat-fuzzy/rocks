import {sketches} from '$data/sketches'

import type {LayoutLoad} from './$types'

export const load: LayoutLoad = () => {
	return {
		sketches,
	}
}
