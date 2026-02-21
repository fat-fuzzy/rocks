import {buildNav, buildSubnav} from '$data/nav'
import decisions from '$data/decisions'
import usages from '$data/usages'
import speaking from '$data/speaking'

const decisionsMarkdowns = decisions.markdowns
	.filter(({meta}) => meta.status !== 'draft')
	.reverse()
const usagesMarkdowns = usages.markdowns
	.filter(({meta}) => meta.status !== 'draft')
	.reverse()

export const load = async ({locals, url, params}) => {
	const sidebar = buildNav('about')
	let talks
	let speakerNotes

	if (params.talk) {
		talks = await speaking.fetchMarkdowns(params.talk)
		speakerNotes = await speaking.fetchSpeakerNotes(params.talk)
	} else {
		talks = await speaking.fetchTalks()
	}

	sidebar.reveal = locals.sidebar.reveal ?? sidebar.reveal
	sidebar.actionPath = url.pathname
	sidebar.layout =
		url.pathname === '/about/decisions' || url.pathname === '/about/usage'
			? 'tram'
			: url.pathname.startsWith('/about/speaking')
				? 'steam'
				: 'voyager'

	sidebar.items[0].items = (sidebar.items[0].items ?? []).map((item) => {
		if (item.slug === 'usage') {
			item.items = usagesMarkdowns.map(({meta}) => meta)
			item.reveal = locals.navUsage
		} else if (item.slug === 'decisions') {
			item.items = decisionsMarkdowns.map(({meta}) => meta)
			item.reveal = locals.navDecisions
		} else if (item.slug === 'speaking') {
			item.reveal = locals.navSpeaking
			if (!params.talk) {
				item.items = talks.map(({meta}) => ({
					...meta,
					formaction: `toggleTalk-${meta.slug}`, // TODO: : generate toggleReveal actions per talk
				}))
			} else {
				item.items = buildSubnav('/about/speaking', talks)
			}
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
		layout: sidebar.layout ? sidebar.layout : params.slug ? 'metro' : 'voyager',
		talks,
		speakerNotes,
	}

	return data
}
