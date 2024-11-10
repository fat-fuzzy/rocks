// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true
export const ssr = true

export const load = async ({locals}) => {
	let styles
	let settings
	if (locals.styles) {
		styles = JSON.parse(locals.styles)
	}
	if (locals.settings) {
		settings = JSON.parse(locals.settings)
	}

	return {
		styles,
		settings,
	}
}
