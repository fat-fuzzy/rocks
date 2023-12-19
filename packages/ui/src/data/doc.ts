import markdownUtils from './markdown'

const categoryPrefix = '/src/assets/doc/'
const tokensPathPrefix = '/src/assets/doc/tokens/'
const blocksPathPrefix = '/src/assets/doc/blocks/'
const layoutsPathPrefix = '/src/assets/doc/layouts/'
const graphicsPathPrefix = '/src/assets/doc/graphics/'
const compositionsPathPrefix = '/src/assets/doc/compositions/'

const categoryImports = import.meta.glob('/src/assets/doc/*.md')
const tokensImports = import.meta.glob('/src/assets/doc/tokens/*.md')
const blocksImports = import.meta.glob('/src/assets/doc/blocks/*.md')
const layoutsImports = import.meta.glob('/src/assets/doc/layouts/*.md')
const compositionsImports = import.meta.glob('/src/assets/doc/compositions/*.md')
const graphicsImports = import.meta.glob('/src/assets/doc/graphics/*.md')

async function fetchMarkdowns() {
	const [categories, tokens, blocks, layouts, compositions, graphics] = await Promise.all([
		markdownUtils.fetchMarkdowns(categoryPrefix, categoryImports),
		markdownUtils.fetchMarkdowns(tokensPathPrefix, tokensImports),
		markdownUtils.fetchMarkdowns(blocksPathPrefix, blocksImports),
		markdownUtils.fetchMarkdowns(layoutsPathPrefix, layoutsImports),
		markdownUtils.fetchMarkdowns(compositionsPathPrefix, compositionsImports),
		markdownUtils.fetchMarkdowns(graphicsPathPrefix, graphicsImports),
	])

	return {
		categories: categories.sort(markdownUtils.sortByTitleDesc),
		tokens: tokens.sort(markdownUtils.sortByTitleDesc),
		blocks: blocks.sort(markdownUtils.sortByTitleDesc),
		layouts: layouts.sort(markdownUtils.sortByTitleDesc),
		compositions: compositions.sort(markdownUtils.sortByTitleDesc),
		graphics: graphics.sort(markdownUtils.sortByTitleDesc),
	}
}

export default {fetchMarkdowns}
