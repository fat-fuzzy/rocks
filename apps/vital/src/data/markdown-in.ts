import type {
	FileExt,
	FrontmatterBase,
	FrontmatterStructure,
	ModuleImportInterface,
	SeedMeta,
	SeedSection,
} from '$types'

import {render} from 'svelte/server'

/**
 * Load data from markdown files as HTML
 * @param pathPrefix relative path from this folder to markdown assets
 * @param imports markdown default imports
 * @returns  frontmatter metadata and path of markdown files to load
 */
const parseContentMarkdowns = async (
	startIndex: number,
	section: string,
	pathPrefix: string,
	imports: Record<string, () => Promise<ModuleImportInterface>>,
	isNested?: boolean,
): Promise<SeedSection[]> => {
	if (!imports) return []
	const mdImports = Object.entries(imports)

	const markdowns = await Promise.all(
		mdImports.map(async ([path, resolver], i) => {
			const rank = i + startIndex
			const filename = path.slice(pathPrefix.length, -3) // removes pathPrefix and '.md'

			const result: ModuleImportInterface = await (
				resolver as () => Promise<ModuleImportInterface>
			)()
			const html =
				result && typeof result.default !== 'string'
					? render(result.default, {...result.metadata}).body
					: ''
			const metadata = (result?.metadata as SeedMeta) || {}

			return {
				path: {
					filename,
					filetype: 'md' as FileExt,
					parent: section,
				},
				meta: {
					...metadata,
					rank,
					group: isNested ? metadata.name : undefined,
				},
				content: {
					html,
					json: {},
				},
			}
		}),
	)
	return markdowns
}

/**
 * Load data from markdown files as HTML
 * @param pathPrefix relative path from this folder to markdown assets
 * @param imports markdown default imports
 * @returns  frontmatter metadata and path of markdown files to load
 */
const parseBaseMarkdowns = async (
	pathPrefix: string,
	imports: Record<string, () => Promise<ModuleImportInterface>>,
): Promise<FrontmatterBase[]> => {
	if (!imports) return []
	const mdImports = Object.entries(imports)

	const markdowns = await Promise.all(
		mdImports.map(async ([path, resolver]) => {
			const filename = path.slice(pathPrefix.length, -3) // removes pathPrefix and '.md'
			const result: ModuleImportInterface = await (
				resolver as () => Promise<ModuleImportInterface>
			)()

			const metadata = (result?.metadata as FrontmatterBase) || {}

			return {
				...metadata,
				path: {
					filename,
					filetype: 'md' as FileExt,
				},
			}
		}),
	)
	return markdowns
}

/**
 * Load data from markdown files as HTML
 * @param pathPrefix relative path from this folder to markdown assets
 * @param imports markdown default imports
 * @returns  frontmatter metadata and path of markdown files to load
 */

const parseStructureMarkdowns = async (
	pathPrefix: string,
	imports: Record<string, () => Promise<ModuleImportInterface>>,
): Promise<FrontmatterStructure[]> => {
	if (!imports) return []
	const mdImports = Object.entries(imports)

	const markdowns = await Promise.all(
		mdImports.map(async ([path, resolver]) => {
			const result: ModuleImportInterface = await (
				resolver as () => Promise<ModuleImportInterface>
			)()

			const filename = path.slice(pathPrefix.length, -3) // removes pathPrefix and '.md'

			const metadata = (result?.metadata as FrontmatterStructure) || {}

			return {
				...metadata,
				path: {
					filename,
					filetype: 'md' as FileExt,
				},
			}
		}),
	)
	return markdowns
}

export default {
	parseBaseMarkdowns,
	parseStructureMarkdowns,
	parseContentMarkdowns,
}
