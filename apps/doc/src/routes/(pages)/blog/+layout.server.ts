import blog from '$data/blog'

import {buildNav} from '$data/nav'

const posts = await blog.markdowns.filter(({meta}) => meta.status !== 'draft')
let sidebar = buildNav('blog')

sidebar.items = sidebar.items.map((item) => {
	if (item.slug === 'blog') {
		item.items = posts.map(({meta}) => meta)
	}
	return item
})

export const load = async (event) => {
	sidebar.reveal = event.locals.sidebar.reveal ?? sidebar.reveal

	const data = {
		sidebar,
		markdowns: posts,
	}

	return data
}
