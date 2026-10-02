import type {RouteNameFor} from '$types'

export const matchChlorophyll = (
	param: string,
): param is RouteNameFor<'chlorophyll'> => {
	return (
		param === 'edit' ||
		param === 'build' ||
		param === 'compare' ||
		param === 'preview'
	)
}
