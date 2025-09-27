import {error} from '@sveltejs/kit'
import {commonActions} from '$lib/server/actions/page-actions'
import images from '$data/images'

/**
 * Load data from markdown file based on route parameters
 * @param params Request parameters
 * @returns post data
 */
export const load = async ({params, parent}) => {
	const {slug} = params
	const {talks, speakerNotes} = await parent()
	const content = talks.find(
		(v) => v.meta.status !== 'draft' && v.meta.slug === slug,
	)
	const notes = speakerNotes?.find((p) => p.meta.slug === slug)

	if (!content) {
		error(404, 'Not found')
	}

	let image
	// Load image data if an image is specified in the frontmatter
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
		notes,
		image,
		content,
	}
}

export const actions = commonActions
