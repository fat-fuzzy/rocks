import markdownUtils from './markdown'

const pathPrefix = '/src/assets/pages/'

const pages: {[page: string]: any} = {
	home: await import.meta.glob('/src/assets/pages/home.md'),
	doc: await import.meta.glob('/src/assets/pages/doc.md'),
	play: await import.meta.glob('/src/assets/pages/play.md'),
}

async function fetchMarkdowns(page: string) {
	const imports = pages[page]
	const markdowns = await markdownUtils.fetchMarkdowns(pathPrefix, imports)
	return markdowns.sort(markdownUtils.sortByIdDesc)
}
export default {fetchMarkdowns}
