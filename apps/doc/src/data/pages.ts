import markdownUtils from './markdown'

const pathPrefix = '/src/assets/pages/'

const pages: {[page: string]: any} = {
	home: await import.meta.glob('/src/assets/pages/home.md'),
	doc: await import.meta.glob('/src/assets/pages/doc.md'),
	play: await import.meta.glob('/src/assets/pages/play.md'),
	ui: await import.meta.glob('/src/assets/pages/ui.md'),
	blog: await import.meta.glob('/src/assets/pages/blog.md'),
}

async function fetchMarkdowns(page: string): Promise<{[key: string]: any}> {
	const imports = pages[page]
	const markdowns = await markdownUtils.fetchMarkdowns(pathPrefix, imports)
	return markdowns.sort(markdownUtils.sortByIdDesc)
}
export default {fetchMarkdowns}
