import markdownUtils from './markdown'

const pathPrefix = '/src/assets/usage/'

const imports = import.meta.glob('/src/assets/usage/*.md')

async function fetchMarkdowns() {
	const usages = await markdownUtils.fetchMarkdowns(pathPrefix, imports)
	return usages
}

export default {fetchMarkdowns}
