import type {NavItem} from '$types'

import ui from '@fat-fuzzy/ui'
import {buildNav} from '$data/nav'
import speaking from '$data/speaking'

const {DEFAULT_PREFERENCES, DEFAULT_REVEAL_STATE} = ui.constants

export const load = async ({locals, url}) => {
	const pageName = url.pathname.split('/')
	let sidebar
	let talks = await speaking.fetchTalks()

	if (pageName.length > 0 && pageName[1]) {
		sidebar = buildNav(pageName[1])
		sidebar.reveal = locals.sidebar.reveal ?? sidebar.reveal
		sidebar.actionPath = url.pathname
		sidebar.items = sidebar.items.map((item) => {
			if (item.slug === 'speaking') {
				// Build talks navbar with nested links for series
				item.items = talks.reduce((links: NavItem[], {meta}) => {
					if (meta.series) {
						if (meta.index === 1) {
							meta.items = meta.series.items
								.map((id, index) => {
									if (index > 0) {
										const item = talks.find((p) => p.meta.id === id)
										if (item) {
											return {
												slug: item.meta.slug,
												title: item.meta.series.title,
												itemPath: '/speaking',
											}
										}
									}
								})
								.filter((i) => i !== undefined) as NavItem[]
							meta.title = meta.series.title
							links.push(meta)
						}
					} else {
						links.push(meta)
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
		sidebar,
		pageContext,
		appContext,
	}
}
