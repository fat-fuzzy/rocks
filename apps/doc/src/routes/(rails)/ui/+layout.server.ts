import {error, redirect} from '@sveltejs/kit'
import assets from '$data/ui'
import pages from '$data/pages'

const page = 'ui'
const markdowns = assets.markdowns

export const load = async ({locals, params, parent}) => {
	const {sidebar} = await parent()
	let content = null

	const component = params.component
	const category = params.category

	const slug = component ? component : category
	sidebar.layout = slug ? 'tram' : sidebar.layout

	if (!slug) {
		content = await pages.fetchMarkdowns(page)
		if (!content?.length) {
			error(404, {message: 'Not found'})
		} else {
			content = content[0]
		}
	} else if (category === 'graphics') {
		redirect(301, '/doc/usage/sketch')
	} else if (slug === component && category) {
		const categoryMarkdowns = markdowns[category]
		if (!categoryMarkdowns?.length) {
			error(404, {message: 'Not found'})
		} else {
			content = categoryMarkdowns.find(
				({meta}) => meta.slug === slug && meta.status !== 'draft',
			)
			if (!content?.meta) {
				error(404, {message: 'Not found'})
			}
		}
	} else if (slug === category) {
		if (!markdowns[category]) {
			error(404, {message: 'Not found'})
		}
		content = markdowns[category].find(
			({meta}) => meta.slug === category && meta.status !== 'draft',
		)
		if (!content?.meta) {
			error(404, {message: 'Not found'})
		}
	}

	let styles
	let ui

	if (locals.dsStyles) {
		styles = locals.dsStyles
	}
	if (locals.dsState) {
		ui = locals.dsState
	}

	return {
		markdowns,
		content,
		styles,
		ui,
	}
}
