import pages from '$data/pages'

const page = 'home'

export const load = async (event) => {
	let styles = {}
	let settings = {}
	let app = {}
	const content = await pages.fetchMarkdowns(page)

	if (event.locals.styles) {
		styles = JSON.parse(event.locals.styles)
	}
	if (event.locals.settings) {
		settings = JSON.parse(event.locals.settings)
	}
	if (event.locals.app) {
		app = JSON.parse(event.locals.app)
	}

	return {
		styles,
		settings,
		app,
		// TODO: Implement a better way to handle this: HTTP error
		content: content.length ? content[0] : {meta: {title: ''}},
	}
}
