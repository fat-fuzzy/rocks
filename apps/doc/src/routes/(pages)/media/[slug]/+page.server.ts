import {error} from '@sveltejs/kit'
import uiActions from '$lib/forms/actions/ui-actions'
import settingsActions from '$lib/forms/actions/settings-actions'
import images from '$data/images'

export const load = async ({params}) => {
	const {slug} = params

	try {
		const imageData = await images.getImageData('media', slug)

		if (!imageData?.json.sources) {
			error(404, 'Not found')
		}

		return {
			src: `/${imageData.json.path}/${slug}`,
			...imageData.json,
			sources: imageData.json.sources,
		}
	} catch (e) {
		error(500, 'Error loading image data')
	}
}

export const actions = {
	toggleNav: async (event) => {
		const updated = await uiActions.handleToggleNav(event)
		event.locals.nav = updated.state
	},
	toggleSettings: async (event) => uiActions.handleToggleSettings(event),
	updateSettings: async (event) =>
		settingsActions.handleUpdateAppSettings({event}),
}
