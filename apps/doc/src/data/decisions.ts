const decisionsMarkdowns = import.meta.glob('../assets/decisions/*.md', {
	import: 'default',
})
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
			const filePath = path.slice(20, -3) // removes '/src/assets' and '*.md'

			return {
				path: filePath,
				html: result.render().html,
			}
		}),
	)

	return allData
}

export default fetchDecisions
