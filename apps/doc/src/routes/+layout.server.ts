// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true
export const ssr = true

export const load = async (event) => {
	let styles
	let settings
	if (event.locals.styles) {
		styles = JSON.parse(event.locals.styles)
	}
	if (event.locals.settings) {
		settings = JSON.parse(event.locals.settings)
	}

	return {
		styles,
		settings,
	}
}
