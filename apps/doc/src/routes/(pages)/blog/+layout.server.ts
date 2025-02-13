import blog from '$data/blog'

import {buildNav} from '$data/nav'

const posts = blog.markdowns.filter(({meta}) => meta.status !== 'draft')

export const load = async ({locals, url}) => {
	let sidebar = buildNav('blog')
	sidebar.actionPath = url.pathname
	sidebar.reveal = locals.sidebar.reveal ?? sidebar.reveal
	sidebar.items = sidebar.items.map((item) => {
		if (item.slug === 'blog') {
			item.items = posts.map(({meta}) => meta)
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
