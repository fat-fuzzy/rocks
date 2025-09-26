import type {NavItem} from '$types'

import ui from '@fat-fuzzy/ui'
import {buildNav} from '$data/nav'
import speaking from '$data/speaking'

const {DEFAULT_PREFERENCES, DEFAULT_REVEAL_STATE} = ui.constants

export const load = async ({locals, url, params}) => {
	const pageName = url.pathname.split('/')
	let sidebar
	let talks
	let speakerNotes

	if (params.talk) {
		talks = await speaking.fetchMarkdowns(params.talk)
		speakerNotes = await speaking.fetchSpeakerNotes(params.talk)
	} else {
		talks = await speaking.fetchTalks()
	}

	if (pageName.length > 0 && pageName[1]) {
		sidebar = buildNav(pageName[1])
		sidebar.actionPath = url.pathname
		sidebar.reveal = locals.sidebar.reveal ?? sidebar.reveal
		sidebar.items = sidebar.items.map((item) => {
			if (item.slug === 'speaking') {
				// Build talks navbar with nested links for series
				item.items = talks.reduce((links: NavItem[], {meta}) => {
					if (meta.series) {
						if (meta.index === 0) {
							meta.items = meta.series.items
								.map((id, index) => {
									if (index > 0) {
										const item = talks.find((p) => p.meta.id === id)
										if (item) {
											return {
												slug: item.meta.slug,
												talk: item.meta.talk,
												title: item.meta.series.title,
												itemPath: `/speaking/${meta.talk}`,
											}
										}
									}
								})
								.filter((i) => i !== undefined) as NavItem[]
							meta.title = meta.series.title
							links.push(meta)
						}
					} else {
						const link = {
							slug: meta.slug,
							talk: meta.talk,
							title: meta.series.title,
							itemPath: `/speaking/${meta.talk}`,
						}
						links.push(link)
					}
					return links
				}, [])
			}
			return item
		})
	}

	if (!sidebar) {
		sidebar = {layout: 'tgv', items: []}
	}

	const appContext = locals.appContext ?? {
		...DEFAULT_REVEAL_STATE,
		...DEFAULT_PREFERENCES,
	}
	const pageContext = locals.pageContext
	appContext.actionPath = url.pathname
	pageContext.actionPath = url.pathname

	return {
		talks,
		speakerNotes,
		sidebar,
		pageContext,
		appContext,
	}
}
