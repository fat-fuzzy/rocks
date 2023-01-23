const logComponents = import.meta.glob('../assets/log/*.md', {
	import: 'default',
})
/**
 * Load Log data from markdown files contained in 'src/data/logs'
 *
 * @returns { meta, path } frontmatter metadata and path of markdown files to load
 */

const pathPrefix = '../assets/log/'
const fetchLogs = async () => {
	const logImports = Object.entries(logComponents)

	const logs = await Promise.all(
		// TODO: understand this vite functionality
		logImports.map(async ([path, resolver]) => {
			const result: any = await resolver()
			const filePath = path.slice(pathPrefix.length, -3) // removes '/src/assets' and '*.md'

			return {
				path: filePath,
				html: result.render().html,
			}
		}),
	)

	return logs
}

export default fetchLogs
