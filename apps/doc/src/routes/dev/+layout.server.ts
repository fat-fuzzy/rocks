import type {LayoutServerLoad} from './$types'
import dev from '$data/dev'

export const load: LayoutServerLoad = async () => {
	const markdowns = await dev.markdowns

	return {markdowns}
}
