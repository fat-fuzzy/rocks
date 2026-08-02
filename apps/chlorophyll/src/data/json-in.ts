import type {
	FileExt,
	FrontmatterBase,
	FrontmatterStructure,
	ModuleImportInterface,
	SeedMeta,
	SeedSection,
} from '$types'

/**
 * Load data from markdown files as JSON
 * @param pathPrefix relative path from this folder to markdown assets
 * @param imports markdown default imports
 * @returns frontmatter metadata and path of markdown files to load
 */
const parseContentJson = async (
	pathPrefix: string,
	imports: Record<string, () => Promise<ModuleImportInterface>>,
): Promise<SeedSection[]> => {
	if (!imports) return []
	const jsonImports = Object.entries(imports)

	const json = await Promise.all(
		jsonImports.map(async ([path, resolver]) => {
			const result: ModuleImportInterface = await (
				resolver as () => Promise<ModuleImportInterface>
			)()
			const filename = path.slice(pathPrefix.length, -5) // removes pathPrefix and '.json'

			const metadata = (result?.metadata as SeedMeta) || {}
			const contentJson =
				typeof result.default === 'string' ? JSON.parse(result.default) : {}

			return {
				meta: {
					...metadata,
					filename,
					filetype: 'json' as FileExt,
				},
				content: {
					html: '',
					json: contentJson,
				},
			}
		}),
	)
	return json
}

/**
 * Load data from markdown files as JSON
 * @param pathPrefix relative path from this folder to markdown assets
 * @param imports markdown default imports
 * @returns frontmatter metadata and path of markdown files to load
 */
const parseBaseJson = async (
	pathPrefix: string,
	imports: Record<string, () => Promise<ModuleImportInterface>>,
): Promise<FrontmatterBase[]> => {
	if (!imports) return []
	const jsonImports = Object.entries(imports)

	const json = await Promise.all(
		jsonImports.map(async ([path, resolver]) => {
			const result: ModuleImportInterface = await (
				resolver as () => Promise<ModuleImportInterface>
			)()
			const filename = path.slice(pathPrefix.length, -5) // removes pathPrefix and '.json'

			const metadata = (result?.metadata as FrontmatterBase) || {}
			const contentJson =
				typeof result.default === 'string' ? JSON.parse(result.default) : {}

			return {
				...metadata,
				path: {
					filename,
					filetype: 'md' as FileExt,
				},
				content: {
					html: '',
					json: contentJson,
				},
			}
		}),
	)
	return json
}

/**
 * Load data from markdown files as JSON
 * @param pathPrefix relative path from this folder to markdown assets
 * @param imports markdown default imports
 * @returns frontmatter metadata and path of markdown files to load
 */
const parseStructureJson = async (
	pathPrefix: string,
	imports: Record<string, () => Promise<ModuleImportInterface>>,
): Promise<FrontmatterStructure[]> => {
	if (!imports) return []
	const jsonImports = Object.entries(imports)

	const json = await Promise.all(
		jsonImports.map(async ([path, resolver]) => {
			const result: ModuleImportInterface = await (
				resolver as () => Promise<ModuleImportInterface>
			)()
			const filename = path.slice(pathPrefix.length, -5) // removes pathPrefix and '.json'

			const metadata = (result?.metadata as FrontmatterStructure) || {}
			const contentJson =
				typeof result.default === 'string' ? JSON.parse(result.default) : {}

			return {
				...metadata,
				path: {
					filename,
					filetype: 'md' as FileExt,
				},
				content: {
					html: '',
					json: contentJson,
				},
			}
		}),
	)
	return json
}

export default {
	parseContentJson,
	parseBaseJson,
	parseStructureJson,
}
