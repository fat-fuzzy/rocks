import type {RouteNameFor} from '#types'

export const matchChlorophyll = (
	param: string,
): RouteNameFor<'chlorophyll'> | undefined => {
	if (
		param === 'edit' ||
		param === 'build' ||
		param === 'compare' ||
		param === 'preview'
	) {
		return param
	}
}
