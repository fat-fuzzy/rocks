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
