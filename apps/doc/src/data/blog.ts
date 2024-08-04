import markdownUtils from './markdown'

const pathPrefix = '/src/assets/blog/'

const imports = import.meta.glob('/src/assets/blog/*.md')

async function fetchMarkdowns() {
	const markdowns = await markdownUtils.fetchMarkdowns(pathPrefix, imports)
	return markdowns.sort(markdownUtils.sortByIdDesc)
}

const markdowns = await fetchMarkdowns()

export default {markdowns}
