import blog from '$data/blog'

import {buildNav} from '$data/nav'

const posts = await blog.markdowns.filter(({meta}) => meta.status !== 'draft')
let nav = buildNav('blog')

nav.items = nav.items.map((item) => {
	if (item.slug === 'blog') {
		item.items = posts.map(({meta}) => ({
			slug: meta.slug,
			title: meta.title,
			asset: meta.asset,
		}))
	}
	return item
})

export const load = async (event) => {
	nav.reveal = event.locals.sidebar.reveal

	const data = {
		nav,
		markdowns: posts,
	}

	return data
}
