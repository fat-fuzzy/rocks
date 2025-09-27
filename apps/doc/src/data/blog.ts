import type {Markdown} from '$types'
import assetsUtils from './assets'

const pathPrefix = '/src/assets/blog/'

const imports = import.meta.glob('/src/assets/blog/*.md')

async function fetchMarkdowns(): Promise<Markdown[]> {
	const markdowns = await assetsUtils.fetchMarkdowns(pathPrefix, imports)
	return markdowns.sort(assetsUtils.sortByIdDesc)
}

const markdowns = await fetchMarkdowns()

export default {markdowns}
