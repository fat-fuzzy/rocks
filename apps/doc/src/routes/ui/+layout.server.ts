import assets from '$data/ui'
import pages from '$data/pages'

const page = 'ui'

export const load = async (event) => {
	let styles = null
	let context = null
	let ui = null
	let sidebar = null
	let currentTabs = null
	let content = await pages.fetchMarkdowns(page)

	if (event.locals.dsStyles) {
		styles = JSON.parse(event.locals.dsStyles)
	}
	if (event.locals.dsContext) {
		context = JSON.parse(event.locals.dsContext)
	}
	if (event.locals.dsState) {
		ui = JSON.parse(event.locals.dsState)
	}
	if (event.locals.sidebar) {
		sidebar = JSON.parse(event.locals.sidebar)
	}
	if (event.locals.currentTabs) {
		currentTabs = JSON.parse(event.locals.currentTabs)
	}
	const markdowns = assets.markdowns

	return {
		sidebar,
		styles,
		context,
		ui,
		currentTabs,
		markdowns,
		content: content.length ? content[0] : {meta: {title: ''}},
	}
}
