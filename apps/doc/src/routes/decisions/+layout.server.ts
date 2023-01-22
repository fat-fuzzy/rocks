import type {LayoutServerLoad} from './$types'
const decisionsMarkdowns = import.meta.glob('/src/assets/decisions/*.md')

export const load: LayoutServerLoad = async () => {
	const decisions = Object.entries(decisionsMarkdowns)
	const allData = await Promise.all(
		// TODO: understand this vite functionality
		decisions.map(async ([path, resolver]) => {
			const result: any = await resolver()

			const filePath = path.slice(22, -3) // removes '/src/assets' and '*.md'

			return {
				meta: result?.metadata,
				path: filePath,
			}
		}),
	)
	const sorted = allData.sort((a, b) => {
		return a.meta.id < b.meta.id ? -1 : b.meta.id < a.meta.id ? 1 : 0
	})
	return {decisions: sorted}
}
