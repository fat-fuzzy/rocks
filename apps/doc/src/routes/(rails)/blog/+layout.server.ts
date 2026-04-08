import type {NavItem} from '$types'
import {buildNav} from '$lib/server/services/navigation/setup'
import {pages} from '$config/navigation'
import blog from '$data/blog'

const posts = blog.markdowns.filter(({meta}) => meta.status !== 'draft')

export const load = async ({locals, url}) => {
	const sidebar = buildNav('blog', pages)
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
									const post = posts.find((p) => p.meta.id === id)
									if (post) {
										return {
											slug: post.meta.slug,
											talk: post.meta.talk,
											title: post.meta.series?.title,
											label: post.meta.series?.title,
											actionPath: `/${url.pathname}/${item.slug}`,
										}
									}
								}
							})
							.filter((i) => i !== undefined) as NavItem[]

						meta.title = meta.series.title
						links.push({
							...meta,
							label: meta.title,
							actionPath: `${url.pathname}/${item.slug}`,
						})
					}
				} else {
					// Not a series, just add the link
					const link: NavItem = {
						slug: meta.slug,
						title: meta.title,
						label: meta.title || meta.slug,
						actionPath: `/${item.slug}/${meta.slug}`,
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
