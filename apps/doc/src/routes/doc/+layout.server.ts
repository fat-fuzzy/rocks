import log from '$data/log'
import doc from '$data/dev'
import pages from '$data/pages'

export const load = async (event) => {
	const logMarkdowns = await log.markdowns
	const docMarkdowns = await doc.markdowns
	const content = await pages.fetchMarkdowns('doc')

	const data = {
		markdowns: {
			log: logMarkdowns.filter(({meta}) => meta.status !== 'draft'),
			doc: docMarkdowns.filter(({meta}) => meta.status !== 'draft'),
		},
		// TODO: Implement a better way to handle this
		content: content.length ? content[0] : {meta: {title: ''}},
	}

	return data
}
