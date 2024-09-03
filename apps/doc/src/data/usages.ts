import assetsUtils from './assets'

const pathPrefix = '/src/assets/usages/'

const imports = import.meta.glob('/src/assets/usages/*.md')

async function fetchMarkdowns() {
	const markdowns = await assetsUtils.fetchMarkdowns(pathPrefix, imports)
	return markdowns.sort(assetsUtils.sortByIdDesc)
}

const markdowns = await fetchMarkdowns()

export default {markdowns}
