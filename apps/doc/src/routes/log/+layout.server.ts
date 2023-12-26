import type {LayoutServerLoad} from './$types'
import logs from '$data/log'

export const load: LayoutServerLoad = async () => {
	const markdowns = await logs.markdowns

	return {markdowns}
}
