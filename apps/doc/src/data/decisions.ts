const decisionsMarkdowns = import.meta.glob('/src/assets/decisions/*.md')
/**
 * Load Decision data from markdown files contained in 'src/data/decisions'
 *
 * @returns { meta, path } frontmatter metadata and path of markdown files to load
 */

const fetchDecisions = async () => {
	const decisions = Object.entries(decisionsMarkdowns)

	const allData = await Promise.all(
		// TODO: understand this vite functionality
		decisions.map(async ([path, resolver]) => {
			const result: any = await resolver()
			console.log('fetchDecisions resolver result')
			console.log(result)

			const filePath = path.slice(22, -3) // removes '/src/assets' and '*.md'

			return {
				meta: result?.metadata,
				path: filePath,
			}
		}),
	)

	return allData
}
