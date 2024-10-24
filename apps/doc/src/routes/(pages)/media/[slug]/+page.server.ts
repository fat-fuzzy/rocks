import {error} from '@sveltejs/kit'
import images from '$data/images'

export const prerender = 'auto'
export const ssr = true

export const load = async ({params}) => {
	const {slug} = params

	try {
		const imageData = await images.getImageData('blog', slug)

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
