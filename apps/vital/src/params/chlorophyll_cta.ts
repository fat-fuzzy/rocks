import type {ParamMatcher} from '@sveltejs/kit'
import type {RouteNameFor} from '$lib/types'

export const match = ((param: string): param is RouteNameFor<'chlorophyll'> => {
	return (
		param === 'edit' ||
		param === 'build' ||
		param === 'compare' ||
		param === 'preview'
	)
}) satisfies ParamMatcher
