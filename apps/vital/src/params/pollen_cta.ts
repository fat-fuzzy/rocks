import type {ParamMatcher} from '@sveltejs/kit'
import type {RouteNameFor} from '$lib/types'

export const match = ((param: string): param is RouteNameFor<'pollen'> => {
	return param === 'write' || param === 'reflect' || param === 'explore'
}) satisfies ParamMatcher
