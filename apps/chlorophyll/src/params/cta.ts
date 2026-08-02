import type {ParamMatcher} from '@sveltejs/kit'

export const match = ((
	param: string,
): param is 'edit' | 'build' | 'preview' | 'print' => {
	return (
		param === 'edit' ||
		param === 'build' ||
		param === 'preview' ||
		param === 'print'
	)
}) satisfies ParamMatcher
