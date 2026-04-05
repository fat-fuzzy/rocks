import type {NavItem} from '$types'

import blog from '$data/blog'
import {buildNav} from '$data/nav'

const posts = blog.markdowns.filter(({meta}) => meta.status !== 'draft')

export const load = async ({locals, url}) => {
	const sidebar = buildNav('blog')
	sidebar.actionPath = url.pathname
	sidebar.items = sidebar.items.map((item) => {
		if (item.slug === 'blog') {
			// Build posts navbar with nested links for series
			item.items = posts.reduce((links: NavItem[], {meta}) => {
				if (meta.series) {
					if (meta.index === 1) {
						meta.items = meta.series.items
							.map((id, index) => {
								if (index > 0) {
									const item = posts.find((p) => p.meta.id === id)
									if (item) {
										return {
											slug: item.meta.slug,
											talk: item.meta.talk,
											title: item.meta.series?.title,
											label: item.meta.series?.title,
											actionPath: item.meta.slug,
										}
									}
								}
							})
							.filter((i) => i !== undefined) as NavItem[]

						meta.title = meta.series.title
						links.push({...meta, label: meta.title, actionPath: url.pathname})
					}
				} else {
					// Not a series, just add the link
					const link: NavItem = {
						slug: meta.slug,
						title: meta.title,
						label: meta.title || meta.slug,
						actionPath: meta.slug,
					}
					links.push(link)
				}
				return links
			}, [])
		}
		return item
	})

	const data = {
		nav: locals.nav,
		sidebar,
		markdowns: posts,
	}

	return data
}
