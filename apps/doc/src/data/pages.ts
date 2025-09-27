import type {Markdown} from '$types'
import assetsUtils from './assets'

const pathPrefix = '/src/assets/pages/'

const pages: {[page: string]: any} = {
	home: import.meta.glob('/src/assets/pages/home.md'),
	doc: import.meta.glob('/src/assets/pages/about.md'),
	play: import.meta.glob('/src/assets/pages/play.md'),
	ui: import.meta.glob('/src/assets/pages/ui.md'),
	blog: import.meta.glob('/src/assets/pages/blog.md'),
	learning: import.meta.glob('/src/assets/pages/learning.md'),
	projects: import.meta.glob('/src/assets/pages/projects.md'),
	speaking: import.meta.glob('/src/assets/pages/speaking.md'),
}

async function fetchMarkdowns(page: string): Promise<Markdown[]> {
	const imports = pages[page]
	const markdowns = await assetsUtils.fetchMarkdowns(pathPrefix, imports)
	return markdowns.sort(assetsUtils.sortByIdDesc)
}

export default {fetchMarkdowns}
