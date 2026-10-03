import type {RouteNameFor} from '$types'

export const matchPollen = (
	param: string,
): RouteNameFor<'pollen'> | undefined => {
	if (param === 'write' || param === 'reflect' || param === 'explore') {
		return param
	}
}
