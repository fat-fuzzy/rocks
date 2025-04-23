import ui from '@fat-fuzzy/ui'
import gfx from '@fat-fuzzy/gfx'

import {buildNav} from '$data/nav'

const {DEFAULT_REVEAL_STATE} = ui.constants

let projects = gfx.gl.sketches.projects
	.filter((markdown) => !markdown.meta.draft)
	.map((sketch) => sketch.meta)
let learning = gfx.gl.sketches.learning
	.filter((markdown) => !markdown.meta.draft)
	.map((sketch) => sketch.meta)

export const load = async ({locals, url, params, parent}) => {
	let {sidebar} = await parent()
	sidebar.reveal = locals.sidebar.reveal ?? sidebar.reveal
	sidebar.layout = params.slug ? 'steam' : sidebar.layout
	sidebar.actionPath = url.pathname
	sidebar.items[0].items = (sidebar.items[0].items ?? []).map((item) => {
		if (item.slug === 'learning') {
			item.items = learning
		} else if (item.slug === 'projects') {
			item.items = projects
		}
		return item
	})

	let pageContext = locals.pageContext
	pageContext.actionPath = url.pathname
	pageContext.reveal = pageContext.reveal ?? DEFAULT_REVEAL_STATE.reveal

	return {
		pageContext,
		sidebar,
		projects,
		learning,
	}
}
