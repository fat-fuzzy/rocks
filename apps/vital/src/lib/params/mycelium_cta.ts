import type {RouteNameFor} from '$types'

export const matchMycelium = (
	param: string,
): RouteNameFor<'mycelium'> | undefined => {
	if (param === 'analyze' || param === 'engage') {
		return param
	}
}
