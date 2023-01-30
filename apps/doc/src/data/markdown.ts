/**
 * Load data from markdown files
 * @param pathPrefix relative path from this folder to markdown assets
 * @param markdownImports markdown default imports
 * @returns { path, html, id, slug } frontmatter metadata and path of markdown files to load
 */
const fetchMarkdowns = async (pathPrefix: string, imports: any) => {
	const logImports = Object.entries(imports)
	const logs = await Promise.all(
		// TODO: understand this vite functionality
		logImports.map(async ([path, resolver]) => {
			const result: any = await resolver()

			const filePath = path.slice(pathPrefix.length, -3) // removes pathPrefix and '*.md'
			const html = result.default.render().html
			return {
				meta: result?.metadata,
				path: filePath,
				html,
			}
		}),
	)
	return logs
}

export default {fetchMarkdowns}
