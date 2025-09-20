import assetsUtils from './assets'

const pathPrefix = '/src/assets/speaking/'

const talks: {[page: string]: any} = {
	'pp-code': import.meta.glob('/src/assets/speaking/pp-code/*.md'),
}

const imports = import.meta.glob('/src/assets/speaking/**/abstract.md')

async function fetchMarkdowns(talk: string): Promise<{[key: string]: any}> {
	const imports = talks[talk]
	const markdowns = await assetsUtils.fetchMarkdowns(pathPrefix, imports)
	return markdowns.sort(assetsUtils.sortByIdDesc)
}

async function fetchTalks(): Promise<{[key: string]: any}> {
	const markdowns = await assetsUtils.fetchMarkdowns(pathPrefix, imports)
	return markdowns.sort(assetsUtils.sortByIdDesc)
}

export default {fetchMarkdowns, fetchTalks}
