import {buildNav} from '$data/nav'
import decisions from '$data/decisions'
import usages from '$data/usages'

const decisionsMarkdowns = decisions.markdowns
	.filter(({meta}) => meta.status !== 'draft')
	.reverse()
const usagesMarkdowns = usages.markdowns
	.filter(({meta}) => meta.status !== 'draft')
	.reverse()

export const load = async ({locals, url, params}) => {
	const sidebar = buildNav('about')

	sidebar.reveal = locals.sidebar.reveal ?? sidebar.reveal
	sidebar.actionPath = url.pathname
	sidebar.layout =
		url.pathname === '/about/decisions' || url.pathname === '/about/usage'
			? 'tram'
			: sidebar.layout
	sidebar.items[0].items = (sidebar.items[0].items ?? []).map((item) => {
		if (item.slug === 'usage') {
			item.items = usagesMarkdowns.map(({meta}) => meta)
		} else if (item.slug === 'decisions') {
			item.items = decisionsMarkdowns.map(({meta}) => meta)
		}
		return item
	})

	const data = {
		nav: locals.nav,
		appContext: locals.appContext,
		sidebar,
		markdowns: {
			decisions: decisionsMarkdowns,
			usages: usagesMarkdowns,
		},
		layout: params.slug ? 'metro' : 'voyager',
	}

	return data
}
