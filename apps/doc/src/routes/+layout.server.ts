// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false
export const ssr = true

export const load = async ({locals}) => {
	let styles
	let settings
	if (locals.styles) {
		styles = locals.styles
	}
	if (locals.settings) {
		settings = locals.settings
	}

	return {
		styles,
		settings,
	}
}
