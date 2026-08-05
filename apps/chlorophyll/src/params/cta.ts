import type {ParamMatcher} from '@sveltejs/kit'
import type {ActionDoc} from '$lib/types'

export const match = ((param: string): param is ActionDoc => {
	return (
		param === 'edit' ||
		param === 'build' ||
		param === 'preview' ||
		param === 'print'
	)
}) satisfies ParamMatcher
