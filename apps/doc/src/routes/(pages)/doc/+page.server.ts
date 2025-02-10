import {error} from '@sveltejs/kit'

import images from '$data/images'
import pages from '$data/pages'
import uiActions from '$lib/forms/actions/ui-actions'
import settingsActions from '$lib/forms/actions/settings-actions'

const page = 'doc'
const markdowns = await pages.fetchMarkdowns(page)

export const load = async ({locals}) => {
	const imageSlug = '001-intro'

	if (!markdowns?.length) {
		throw error(404, {message: 'Not found'})
	}
	let content = markdowns[0]

	if (!content?.meta) {
		throw error(404, {message: 'Not found'})
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
			content,
		}
	} catch (e) {
		error(500, 'Error loading image data')
	}
}

export const actions = {
	toggleNav: async (event) => uiActions.handleToggleNav(event),
	toggleSettings: async (event) => uiActions.handleToggleSettings(event),
	toggleUsage: async (event) => uiActions.handleToggleUsage(event),
	toggleDecisions: async (event) => uiActions.handleToggleDecisions(event),
	updateSettings: async (event) =>
		settingsActions.handleUpdateAppSettings({event}),
}
