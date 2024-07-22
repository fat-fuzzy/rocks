import markdownUtils from './markdown'

const pathPrefix = '/src/assets/usages/'

const imports = import.meta.glob('/src/assets/usages/*.md')

async function fetchMarkdowns() {
	const markdowns = await markdownUtils.fetchMarkdowns(pathPrefix, imports)
	return markdowns.sort(markdownUtils.sortByIdDesc)
}

const markdowns = await fetchMarkdowns()

export default {markdowns}
