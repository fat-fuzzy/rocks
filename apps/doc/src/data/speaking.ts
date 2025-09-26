import assetsUtils from './assets'

const pathPrefix = '/src/assets/speaking/'

const talks: {[page: string]: any} = {
	'pp-code': {
		slides: import.meta.glob('/src/assets/speaking/pp-code/*.md'),
		speakerNotes: import.meta.glob(
			'/src/assets/speaking/pp-code/speaker-notes/*.md',
		),
	},
}

async function fetchMarkdowns(talk: string): Promise<{[key: string]: any}> {
	const imports = talks[talk].slides
	const markdowns = await assetsUtils.fetchMarkdowns(pathPrefix, imports)
	return markdowns.sort(assetsUtils.sortByIdDesc)
}

async function fetchTalks(): Promise<{[key: string]: any}> {
	const imports = import.meta.glob('/src/assets/speaking/**/abstract.md')
	let markdowns = await assetsUtils.fetchMarkdowns(pathPrefix, imports)
	return markdowns.sort(assetsUtils.sortByIdDesc)
}

async function fetchSpeakerNotes(talk: string): Promise<{[key: string]: any}> {
	const imports = talks[talk].speakerNotes
	const markdowns = await assetsUtils.fetchMarkdowns(pathPrefix, imports)
	return markdowns.sort(assetsUtils.sortByIdDesc)
}

export default {fetchMarkdowns, fetchTalks, fetchSpeakerNotes}
