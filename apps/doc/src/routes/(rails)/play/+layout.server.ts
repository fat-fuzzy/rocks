import ui from '@fat-fuzzy/ui'
import gfx from '@fat-fuzzy/gfx'

const {DEFAULT_REVEAL_STATE} = ui.constants

const projects = gfx.gl.sketches.projects
	.filter((markdown) => markdown.meta.status !== 'draft')
	.map((sketch) => sketch.meta)
const learning = gfx.gl.sketches.learning
	.filter((markdown) => markdown.meta.status !== 'draft')
	.map((sketch) => sketch.meta)

export const load = async ({locals, url, params, parent}) => {
	const {sidebar} = await parent()
	sidebar.layout = params.slug ? 'steam' : sidebar.layout
	sidebar.items[0].items = (sidebar.items[0].items ?? []).map((item) => {
		if (item.slug === 'learning') {
			item.items = learning.map((i) => ({...i, label: i.title}))
		} else if (item.slug === 'projects') {
			item.items = projects.map((i) => ({...i, label: i.title}))
		}
		return item
	})

	sidebar.items[0].items = (sidebar.items[0].items ?? []).map((item) => {
		if (item.slug === 'learning') {
			item.reveal = locals.navLearning
		} else if (item.slug === 'projects') {
			item.reveal = locals.navProjects
		}
		return item
	})

	const pageContext = locals.pageContext
	pageContext.actionPath = url.pathname
	pageContext.reveal = pageContext.reveal ?? DEFAULT_REVEAL_STATE.reveal

	return {
		pageContext,
		sidebar,
		projects,
		learning,
	}
}
