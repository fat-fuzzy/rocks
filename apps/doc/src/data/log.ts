import markdownUtils from './markdown'

const pathPrefix = '/src/assets/log/'

const imports = import.meta.glob('/src/assets/log/*.md')

async function fetchMarkdowns() {
	const logs = await markdownUtils.fetchMarkdowns(pathPrefix, imports)
	return logs
}

export default {fetchMarkdowns}
