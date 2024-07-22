import markdownUtils from './markdown'

const categoryPrefix = '/src/assets/ui/'
const tokensPathPrefix = '/src/assets/ui/tokens/'
const blocksPathPrefix = '/src/assets/ui/blocks/'
const layoutsPathPrefix = '/src/assets/ui/layouts/'
// const graphicsPathPrefix = '/src/assets/ui/graphics/'
const recipesPathPrefix = '/src/assets/ui/recipes/'

const categoryImports = import.meta.glob('/src/assets/ui/*.md')
const tokensImports = import.meta.glob('/src/assets/ui/tokens/*.md')
const blocksImports = import.meta.glob('/src/assets/ui/blocks/*.md')
const layoutsImports = import.meta.glob('/src/assets/ui/layouts/*.md')
const recipesImports = import.meta.glob('/src/assets/ui/recipes/*.md')
// const graphicsImports = import.meta.glob('/src/assets/ui/graphics/*.md')

async function fetchMarkdowns() {
	const [categories, tokens, blocks, layouts, recipes] = await Promise.all([
		markdownUtils.fetchMarkdowns(categoryPrefix, categoryImports),
		markdownUtils.fetchMarkdowns(tokensPathPrefix, tokensImports),
		markdownUtils.fetchMarkdowns(blocksPathPrefix, blocksImports),
		markdownUtils.fetchMarkdowns(layoutsPathPrefix, layoutsImports),
		markdownUtils.fetchMarkdowns(recipesPathPrefix, recipesImports),
		// markdownUtils.fetchMarkdowns(graphicsPathPrefix, graphicsImports),
	])

	return {
		categories: categories.sort(markdownUtils.sortByTitleDesc),
		tokens: tokens.sort(markdownUtils.sortByTitleDesc),
		blocks: blocks.sort(markdownUtils.sortByTitleDesc),
		layouts: layouts.sort(markdownUtils.sortByTitleDesc),
		recipes: recipes.sort(markdownUtils.sortByTitleDesc),
		// graphics: graphics.sort(markdownUtils.sortByTitleDesc),
	}
}

const markdowns = await fetchMarkdowns()

export default {markdowns}
