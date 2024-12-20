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
		sidebar: locals.sidebar,
	}
}
