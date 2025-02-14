import {error} from '@sveltejs/kit'
import uiActions from '$lib/forms/actions/ui-actions'
import settingsActions from '$lib/forms/actions/settings-actions'
import images from '$data/images'
import {commonActions} from '$lib/forms/services/page-actions'

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
	toggleNav: commonActions.toggleNav,
	toggleSettings: commonActions.toggleSettings,
	updateSettings: commonActions.updateSettings,
}
