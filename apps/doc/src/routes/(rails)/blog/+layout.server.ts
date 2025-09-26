import type {NavItem} from '$types'

import blog from '$data/blog'
import {buildNav} from '$data/nav'

const posts = blog.markdowns.filter(({meta}) => meta.status !== 'draft')

export const load = async ({locals, url}) => {
	let sidebar = buildNav('blog')
	sidebar.actionPath = url.pathname
	sidebar.reveal = locals.sidebar.reveal ?? sidebar.reveal
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
											title: item.meta.series.title,
											itemPath: '/blog',
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

	const data = {
		nav: locals.nav,
		sidebar,
		markdowns: posts,
	}

	return data
}
