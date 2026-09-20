import type {ParamMatcher} from '@sveltejs/kit'
import type {ActionResource} from '$lib/types'

export const match = ((param: string): param is ActionResource => {
	return param === 'write' || param === 'reflect' || param === 'explore'
}) satisfies ParamMatcher
