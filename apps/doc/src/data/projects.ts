import type {Markdown} from '$types'
import assetsUtils from '$lib/server/services/markdowns/assets'

const pathPrefix = '/src/assets/play/projects/'

const imports = import.meta.glob('/src/assets/play/projects/*.md')

async function fetchMarkdowns(): Promise<Markdown[]> {
	const markdowns = await assetsUtils.fetchMarkdowns(pathPrefix, imports)
	return markdowns.sort(assetsUtils.sortByIdDesc)
}

const markdowns = await fetchMarkdowns()

export default {markdowns}
