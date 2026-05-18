import gfx from '@fat-fuzzy/gfx'

const learning = gfx.gl.sketches.learning.filter((sketch) => !sketch.meta.draft)

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false
export const ssr = true

export const load = async ({locals, url}) => {
	// Main header nav
	const nav = locals.nav || []
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
		sketches: learning.map((sketch) => sketch.meta),
	}
}
