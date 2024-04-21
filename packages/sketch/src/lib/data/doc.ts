import markdownUtils from './markdown'

const graphicsPathPrefix = '/src/assets/doc/graphics/'

const graphicsImports = import.meta.glob('/src/assets/doc/graphics/*.md')

async function fetchMarkdowns() {
	const [graphics] = await Promise.all([
		markdownUtils.fetchMarkdowns(graphicsPathPrefix, graphicsImports),
	])

	return {
		graphics: graphics.sort(markdownUtils.sortByTitleDesc),
	}
}

const markdowns = await fetchMarkdowns()
export default {markdowns}
