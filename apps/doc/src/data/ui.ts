import assetsUtils from './assets'

const categoryPrefix = '/src/assets/ui/'
const tokensPathPrefix = '/src/assets/ui/tokens/'
const blocksPathPrefix = '/src/assets/ui/blocks/'
const layoutsPathPrefix = '/src/assets/ui/layouts/'
// const graphicsPathPrefix = '/src/assets/ui/graphics/'
const recipesPathPrefix = '/src/assets/ui/recipes/'
const rawPathPrefix = '/src/assets/ui/raw/'

const categoryImports = import.meta.glob('/src/assets/ui/*.md')
const tokensImports = import.meta.glob('/src/assets/ui/tokens/*.md')
const blocksImports = import.meta.glob('/src/assets/ui/blocks/*.md')
const layoutsImports = import.meta.glob('/src/assets/ui/layouts/*.md')
const recipesImports = import.meta.glob('/src/assets/ui/recipes/*.md')
const rawImports = import.meta.glob('/src/assets/ui/raw/*.md')
// const graphicsImports = import.meta.glob('/src/assets/ui/graphics/*.md')

async function fetchMarkdowns(): Promise<{[key: string]: any}> {
	const [categories, tokens, blocks, layouts, recipes, raw] = await Promise.all(
		[
			assetsUtils.fetchMarkdowns(categoryPrefix, categoryImports),
			assetsUtils.fetchMarkdowns(tokensPathPrefix, tokensImports),
			assetsUtils.fetchMarkdowns(blocksPathPrefix, blocksImports),
			assetsUtils.fetchMarkdowns(layoutsPathPrefix, layoutsImports),
			assetsUtils.fetchMarkdowns(recipesPathPrefix, recipesImports),
			assetsUtils.fetchMarkdowns(rawPathPrefix, rawImports),
			// assetsUtils.fetchMarkdowns(graphicsPathPrefix, graphicsImports),
		],
	)

	return {
		categories: categories.sort(assetsUtils.sortByTitleDesc),
		tokens: tokens.sort(assetsUtils.sortByTitleDesc),
		blocks: blocks.sort(assetsUtils.sortByTitleDesc),
		layouts: layouts.sort(assetsUtils.sortByTitleDesc),
		recipes: recipes.sort(assetsUtils.sortByTitleDesc),
		raw: raw.sort(assetsUtils.sortByTitleDesc),
		// graphics: graphics.sort(assetsUtils.sortByTitleDesc),
	}
}

const markdowns = await fetchMarkdowns()

export default {markdowns}
