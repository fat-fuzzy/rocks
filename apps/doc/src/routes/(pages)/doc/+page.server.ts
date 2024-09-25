import {error} from '@sveltejs/kit'
import {dev} from '$app/environment'

import images from '$data/images'

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true

export const ssr = true

export const load = async ({params}) => {
	const imageSlug = '001-intro'
	try {
		const dayImageData = await images.getImageData('day', imageSlug)
		const nightImageData = await images.getImageData('night', imageSlug)

		if (!dayImageData?.json.sources || !nightImageData?.json.sources) {
			error(404, 'Not found')
		}
		return {
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
		}
	} catch (e) {
		error(500, 'Error loading image data')
	}
}
