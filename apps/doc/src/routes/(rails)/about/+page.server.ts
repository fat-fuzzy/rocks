import {error} from '@sveltejs/kit'

import images from '$data/images'
import pages from '$data/pages'
import uiActions from '$lib/server/actions/ui-actions'
import {commonActions} from '$lib/server/actions/page-actions'

const page = 'doc'
const markdowns = await pages.fetchMarkdowns(page)

export const load = async ({parent}) => {
	const {sidebar, pageContext} = await parent()
	const imageSlug = '001-intro'

	if (!markdowns?.length) {
		error(404, {message: 'Not found'})
	}
	const content = markdowns[0]

	if (!content?.meta) {
		error(404, {message: 'Not found'})
	}

	try {
		const dayImageData = await images.getImageData('day', imageSlug)
		const nightImageData = await images.getImageData('night', imageSlug)

		if (!dayImageData?.json.sources || !nightImageData?.json.sources) {
			error(404, 'Not found')
		}
		return {
			images: {
				day: {
					src: `/${dayImageData.json.path}/${imageSlug}`,
					...dayImageData.json,
					sources: dayImageData.json.sources,
				},
				night: {
					src: `/${nightImageData.json.path}/${imageSlug}`,
					...nightImageData.json,
					sources: nightImageData.json.sources,
				},
			},
			sidebar,
			content,
			pageContext,
		}
	} catch (e) {
		error(500, 'Error loading image data')
	}
}

export const actions = {
	...commonActions,
	toggleUsage: async (event) => {
		const updated = await uiActions.handleToggleUsage(event)
		event.locals.navUsage = updated.state
	},
	toggleDecisions: async (event) => {
		const updated = await uiActions.handleToggleDecisions(event)
		event.locals.navDecisions = updated.state
	},
	toggleSpeaking: async (event) => {
		const updated = await uiActions.handleToggleSpeaking(event)
		event.locals.navSpeaking = updated.state
	},
}
