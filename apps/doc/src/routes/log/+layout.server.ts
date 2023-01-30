import type {LayoutServerLoad} from './$types'
import logData from '$data/log'
// TODO: move to utils / clean
function sortAsc(a, b) {
	return a.meta.id < b.meta.id ? -1 : b.meta.id < a.meta.id ? 1 : 0
}
function sortDesc(a, b) {
	return a.meta.id > b.meta.id ? -1 : b.meta.id > a.meta.id ? 1 : 0
}

export const load: LayoutServerLoad = async () => {
	const logs = await logData.fetchMarkdowns()
	const sorted = logs.sort(sortDesc)

	return {logs: sorted}
}
