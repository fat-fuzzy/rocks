import decisions from '$data/decisions'
import usages from '$data/usages'

export const load = async (event) => {
	const decisionsMarkdowns = decisions.markdowns
	const usagesMarkdowns = usages.markdowns

	const data = {
		markdowns: {
			decisions: decisionsMarkdowns
				.filter(({meta}) => meta.status !== 'draft')
				.reverse(),
			usages: usagesMarkdowns
				.filter(({meta}) => meta.status !== 'draft')
				.reverse(),
		},
		sidebar: event.locals.sidebar,
	}

	return data
}
