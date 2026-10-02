import type {RouteNameFor} from '$types'

export const matchMycelium = (
	param: string,
): param is RouteNameFor<'pollen'> => {
	return param === 'analyze' || param === 'engage'
}
