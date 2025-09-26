import {error} from '@sveltejs/kit'
import {commonActions} from '$lib/server/actions/page-actions'
import images from '$data/images'

export const load = async ({parent, params}) => {
	const {talks} = await parent()

	const content = talks.find((p) => p.meta.slug === params.talk)

	if (!content?.meta) {
		error(404, {message: 'Not found'})
	}

	let image
	if (content.meta.image) {
		try {
			let imageData = await images.getImageData('media', content.meta.image)

			if (!imageData?.json.sources) {
				throw Error(`Image not found: ${JSON.stringify(content.meta.image)}:`)
			}

			image = {
				src: `/${imageData.json.id}`,
				...imageData.json,
				sources: imageData.json.sources,
			}
		} catch (e) {
			error(500, `Error loading image data: ${e}`)
		}
	}

	return {
		content,
		image,
	}
}

export const actions = {
	toggleNav: commonActions.toggleNav,
	toggleSidebar: commonActions.toggleSidebar,
	toggleAppContext: commonActions.toggleAppContext,
	updateSettings: commonActions.updateSettings,
	saveCookiePreferences: commonActions.saveCookiePreferences,
}
