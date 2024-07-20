import markdownUtils from './markdown'

const pathPrefix = '/src/assets/decisions/'

const imports = import.meta.glob('/src/assets/decisions/*.md')

async function fetchMarkdowns() {
	const markdowns = await markdownUtils.fetchMarkdowns(pathPrefix, imports)
	return markdowns.sort(markdownUtils.sortByIdDesc)
}

const markdowns = await fetchMarkdowns()

export default {markdowns}
