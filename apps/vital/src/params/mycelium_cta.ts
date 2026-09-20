import type {ParamMatcher} from '@sveltejs/kit'
import type {RouteNameFor} from '$lib/types'

export const match = ((param: string): param is RouteNameFor<'pollen'> => {
	return param === 'analyze' || param === 'engage'
}) satisfies ParamMatcher
