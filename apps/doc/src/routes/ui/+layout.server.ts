import {error} from '@sveltejs/kit'
import assets from '$data/ui'
import pages from '$data/pages'

const page = 'ui'

export const load = async (event) => {
	let styles = null
	let context = null
	let ui = null
	let sidebar = null
	let currentTabs = null
	let content = null
	let markdowns = assets.markdowns

	let component = event.params.component
	let category = event.params.category

	let slug = component ? component : category

	if (!slug) {
		content = await pages.fetchMarkdowns(page)
	} else if (slug === component && category) {
		let categoryMarkdowns = markdowns[category]
		content = categoryMarkdowns.find(
			({meta}) => meta.slug === slug && meta.status !== 'draft',
		)
		if (!content?.meta) {
			throw error(404, {message: 'Not found'})
		}
	} else if (slug === category) {
		if (!markdowns[category]) {
			throw error(404, {message: 'Not found'})
		}
		content = markdowns[category].find(
			({meta}) => meta.slug === category && meta.status !== 'draft',
		)
		if (!content?.meta) {
			throw error(404, {message: 'Not found'})
		}
	}

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

	return {
		sidebar,
		styles,
		context,
		ui,
		currentTabs,
		markdowns,
		content,
	}
}
