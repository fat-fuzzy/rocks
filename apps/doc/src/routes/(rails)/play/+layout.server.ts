import gfx from '@fat-fuzzy/gfx'

const projects = gfx.gl.sketches.projects
	.filter((markdown) => markdown.meta.status !== 'draft')
	.map((sketch) => sketch.meta)
const learning = gfx.gl.sketches.learning
	.filter((markdown) => markdown.meta.status !== 'draft')
	.map((sketch) => sketch.meta)

const page = 'play'

export const load = async ({locals, url, params, parent}) => {
	const {sidebar} = await parent()
	sidebar.layout = params.slug ? 'steam' : sidebar.layout
	sidebar.items[0].items = (sidebar.items[0].items ?? []).map((item) => {
		if (item.slug === 'learning') {
			item.items = learning.map((i) => ({
				...i,
				label: i.title,
				actionPath: `/${page}/${item.slug}/${i.slug}`,
			}))
		} else if (item.slug === 'projects') {
			item.items = projects.map((i) => ({
				...i,
				label: i.title,
				actionPath: `/${page}/${item.slug}/${i.slug}`,
			}))
		}
		return item
	})

	const pageContext = locals.pageContext ?? {}
	pageContext.actionPath = url.pathname

	return {
		pageContext,
		sidebar,
		projects,
		learning,
	}
}
