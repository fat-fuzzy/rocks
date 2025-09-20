import assetsUtils from './assets'

const pathPrefix = '/src/assets/talks/'

const talks: {[page: string]: any} = {
	'pp-code': import.meta.glob('/src/assets/talks/pp-code/*.md'),
}

async function fetchMarkdowns(talk: string): Promise<{[key: string]: any}> {
	const imports = talks[talk]
	const markdowns = await assetsUtils.fetchMarkdowns(pathPrefix, imports)
	return markdowns.sort(assetsUtils.sortByIdDesc)
}

export default {fetchMarkdowns}
