import log from '$data/log'
import doc from '$data/dev'

export const load = async (event) => {
	const logMarkdowns = await log.markdowns
	const docMarkdowns = await doc.markdowns

	return {
		markdowns: {log: logMarkdowns, doc: docMarkdowns},
	}
}
