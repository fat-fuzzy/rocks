/**
 * Load Log data from markdown files contained in 'src/data/log'
 *
 * @returns { meta, path } frontmatter metadata and path of markdown files to load
 */

export const fetchComponentData = async () => {
	const uiImports = await import('@fat-fuzzy/ui')
	const blocks = Object.keys(uiImports.blocks)
	const layouts = Object.keys(uiImports.layouts)
	return {components: {blocks, layouts}}
}
