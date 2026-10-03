import type {RouteNameFor} from '$types'

export const matchMycelium = (
	param: string,
): RouteNameFor<'mycelium'> | null => {
	return param === 'analyze' || param === 'engage' ? param : null
}
