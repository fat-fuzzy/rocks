import gfx from '@fat-fuzzy/gfx'

import {buildNav} from '$data/nav'

let projects = gfx.gl.sketches.projects
	.filter((markdown) => !markdown.meta.draft)
	.map((sketch) => sketch.meta)
let learning = gfx.gl.sketches.learning
	.filter((markdown) => !markdown.meta.draft)
	.map((sketch) => sketch.meta)

let nav = buildNav('play')

nav.items[0].items = nav.items[0].items.map((item) => {
	if (item.slug === 'learning') {
		item.items = learning
	} else if (item.slug === 'projects') {
		item.items = projects
	}
	return item
})

export const load = async (event) => {
	nav.reveal = event.locals.sidebar.reveal ?? nav.reveal

	const data = {
		nav,
		projects,
		learning,
	}
	return data
}
