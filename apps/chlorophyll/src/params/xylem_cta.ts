import type {ParamMatcher} from '@sveltejs/kit'
import type {ActionNote} from '$lib/types'

export const match = ((param: string): param is ActionNote => {
	return param === 'edit' || param === 'build' || param === 'preview'
}) satisfies ParamMatcher
