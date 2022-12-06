import type {LayoutLoad} from './$types'

export const load: LayoutLoad = async ({fetch}) => {
	try {
		const response = await fetch('/api/sketches')
		const sketches = await response.json()

		return {sketches}
	} catch (error) {
		console.log(error)
		// TODO: proper error handling
	}
}
