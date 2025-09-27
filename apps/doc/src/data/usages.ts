import type {Markdown} from '$types'
import assetsUtils from './assets'

const pathPrefix = '/src/assets/usages/'

const imports = import.meta.glob('/src/assets/usages/*.md')

async function fetchMarkdowns(): Promise<Markdown[]> {
	const markdowns = await assetsUtils.fetchMarkdowns(pathPrefix, imports)
	return markdowns.sort(assetsUtils.sortByIdDesc)
}

const markdowns = await fetchMarkdowns()

export default {markdowns}
