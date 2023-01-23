import type {LayoutServerLoad} from './$types'
const logMarkdowns = import.meta.glob('/src/assets/log/*.md')

// TODO: move to utils / clean
function sortAsc(a, b) {
	return a.meta.id < b.meta.id ? -1 : b.meta.id < a.meta.id ? 1 : 0
}
function sortDesc(a, b) {
	return a.meta.id > b.meta.id ? -1 : b.meta.id > a.meta.id ? 1 : 0
}

const pathPrefix = '/src/assets/log/'
export const load: LayoutServerLoad = async () => {
	const logImports = Object.entries(logMarkdowns)
	const logs = await Promise.all(
		// TODO: understand this vite functionality
		logImports.map(async ([path, resolver]) => {
			const result: any = await resolver()

			const filePath = path.slice(pathPrefix.length, -3) // removes '/src/assets' and '*.md'

			return {
				meta: result?.metadata,
				path: filePath,
			}
		}),
	)
	const sorted = logs.sort(sortDesc)

	return {logs: sorted}
}
