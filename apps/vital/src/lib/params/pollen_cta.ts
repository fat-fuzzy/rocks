import type {RouteNameFor} from '$types'

export const matchPollen = (param: string): param is RouteNameFor<'pollen'> => {
	return param === 'write' || param === 'reflect' || param === 'explore'
}
