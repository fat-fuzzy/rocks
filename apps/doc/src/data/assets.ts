import {render} from 'svelte/server'

/**
 * Load data from markdown files
 * @param pathPrefix relative path from this folder to markdown assets
 * @param imports markdown default imports
 * @returns frontmatter metadata and path of markdown files to load
 */
const fetchJson = async (pathPrefix: string, imports: any) => {
	if (!imports) return []
	const mdImports = Object.entries(imports)

	const logs = await Promise.all(
		mdImports.map(async ([path, resolver]) => {
			const result: any = await (resolver as () => Promise<any>)()
			const filePath = path.slice(pathPrefix.length, -5) // removes pathPrefix and '.json'

			return {
				json: result.default,
				path: filePath,
			}
		}),
	)
	return logs
}

/**
 * Load data from markdown files
 * @param pathPrefix relative path from this folder to markdown assets
 * @param imports markdown default imports
 * @returns  frontmatter metadata and path of markdown files to load
 */
const fetchMarkdowns = async (pathPrefix: string, imports: any) => {
	if (!imports) return []
	const mdImports = Object.entries(imports)

	const logs = await Promise.all(
		mdImports.map(async ([path, resolver]) => {
			const result: any = await (resolver as () => Promise<any>)()
			const filePath = path.slice(pathPrefix.length, -3) // removes pathPrefix and '.md'
			const html = result
				? render(result.default, {...result.metadata}).body
				: ''

			return {
				meta: result?.metadata || {},
				path: filePath,
				html,
			}
		}),
	)
	return logs
}

function sortByTitleAsc(a, b) {
	return a.meta.title < b.meta.title ? -1 : b.meta.title < a.meta.title ? 1 : 0
}
function sortByTitleDesc(a, b) {
	return a.meta.title > b.meta.title ? -1 : b.meta.title > a.meta.title ? 1 : 0
}
function sortByIdAsc(a, b) {
	return a.meta.id < b.meta.id ? -1 : b.meta.id < a.meta.id ? 1 : 0
}
function sortByIdDesc(a, b) {
	return a.meta.id > b.meta.id ? -1 : b.meta.id > a.meta.id ? 1 : 0
}
export default {fetchMarkdowns, fetchJson, sortByTitleDesc, sortByIdDesc}
