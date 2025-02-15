import {buildNav} from '$data/nav'

import decisions from '$data/decisions'
import usages from '$data/usages'

const decisionsMarkdowns = decisions.markdowns
	.filter(({meta}) => meta.status !== 'draft')
	.reverse()
const usagesMarkdowns = usages.markdowns
	.filter(({meta}) => meta.status !== 'draft')
	.reverse()

export const load = async ({locals, url}) => {
	let sidebar = buildNav('doc')
	sidebar.reveal = locals.sidebar.reveal ?? sidebar.reveal
	sidebar.actionPath = url.pathname
	sidebar.items[0].items = (sidebar.items[0].items ?? []).map((item) => {
		if (item.slug === 'usage') {
			item.items = usagesMarkdowns.map(({meta}) => meta)
		} else if (item.slug === 'decisions') {
			item.items = decisionsMarkdowns.map(({meta}) => meta)
		}
		return item
	})

	const data = {
		sidebar,
		markdowns: {
			decisions: decisionsMarkdowns,
			usages: usagesMarkdowns,
		},
	}

	return data
}
