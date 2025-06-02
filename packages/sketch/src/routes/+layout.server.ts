import gfx from '@fat-fuzzy/gfx'

const learning = gfx.gl.sketches.learning
	.filter((sketch) => !sketch.meta.draft)
	.map((sketch) => sketch.meta)

const links = {
	title: 'Sketches',
	id: 'nav-sketches',
	layout: 'steam',
	items: [
		{
			slug: 'projects',
			title: 'Projects',
			asset: 'projects',
			formaction: 'toggleProjects',
			items: [],
		},
		{
			slug: 'learning',
			title: 'Learning',
			asset: 'learning',
			formaction: 'toggleLearning',
			items: [],
		},
	],
}

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false
export const ssr = true

export const load = async ({locals, url}) => {
	// Main header nav
	const nav = locals.nav || links
	nav.actionPath = url.pathname
	nav.reveal = nav.reveal ?? 'expanded'

	const appContext = {
		brightness: 'day',
		contrast: 'contrast',
		reveal: true,
		actionPath: url.pathname,
	}

	return {
		nav,
		appContext,
		sketches: learning,
		sidenav: links,
	}
}
