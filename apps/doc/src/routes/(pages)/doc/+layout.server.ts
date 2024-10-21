import decisions from '$data/decisions'
import usages from '$data/usages'

export const load = async (event) => {
	const decisionsMarkdowns = await decisions.markdowns
	const usagesMarkdowns = await usages.markdowns

	const data = {
		markdowns: {
			decisions: decisionsMarkdowns
				.filter(({meta}) => meta.status !== 'draft')
				.reverse(),
			usages: usagesMarkdowns
				.filter(({meta}) => meta.status !== 'draft')
				.reverse(),
		},
	}

	return data
}
