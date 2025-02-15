import {error} from '@sveltejs/kit'
import images from '$data/images'
import {actions as parentActions} from '../+page.server'

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

export const actions = parentActions
