import type {LayoutServerLoad} from './$types'
import usageData from '$data/usage'
// TODO: move to utils / clean
function sortAsc(a, b) {
	return a.meta.id < b.meta.id ? -1 : b.meta.id < a.meta.id ? 1 : 0
}
function sortDesc(a, b) {
	return a.meta.id > b.meta.id ? -1 : b.meta.id > a.meta.id ? 1 : 0
}

export const load: LayoutServerLoad = async () => {
	const usages = await usageData.fetchMarkdowns()
	// const sorted = usages.sort(sortDesc)

	return {usages}
}
