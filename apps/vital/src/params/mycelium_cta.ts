import type {ParamMatcher} from '@sveltejs/kit'
import type {ActionTransform} from '$lib/types'

export const match = ((param: string): param is ActionTransform => {
	return param === 'analyze' || param === 'engage'
}) satisfies ParamMatcher
