import type {LayoutServerLoad} from './$types'
import markdownData from '$data/dev'
// TODO: move to utils / clean
function sortAsc(a, b) {
	return a.meta.id < b.meta.id ? -1 : b.meta.id < a.meta.id ? 1 : 0
}
function sortDesc(a, b) {
	return a.meta.id > b.meta.id ? -1 : b.meta.id > a.meta.id ? 1 : 0
}

export const load: LayoutServerLoad = async () => {
	const markdowns = await markdownData.fetchMarkdowns()
	// const sorted = devs.sort(sortDesc)

	return {markdowns}
}
