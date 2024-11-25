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
