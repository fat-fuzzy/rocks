import gfx from '@fat-fuzzy/gfx'

import {buildNav} from '$data/nav'

let projects = gfx.gl.sketches.projects
	.filter((markdown) => !markdown.meta.draft)
	.map((sketch) => sketch.meta)
let learning = gfx.gl.sketches.learning
	.filter((markdown) => !markdown.meta.draft)
	.map((sketch) => sketch.meta)

let sidebar = buildNav('play')

sidebar.items[0].items = sidebar.items[0].items.map((item) => {
	if (item.slug === 'learning') {
		item.items = learning
	} else if (item.slug === 'projects') {
		item.items = projects
	}
	return item
})

export const load = async (event) => {
	sidebar.reveal = event.locals.sidebar.reveal ?? sidebar.reveal

	const data = {
		sidebar,
		projects,
		learning,
	}
	return data
}
