import {error} from '@sveltejs/kit'
import lib from '@fat-fuzzy/lib'
import pages from '$data/pages'
import images from '$data/images'

const page = 'play'
const cssAnimations = [{slug: 'fat-fuzzy', title: 'Fat Fuzzy', count: 5}]

export const load = async (event) => {
	try {
		const sketches = lib.gfx.sketches.map((sketch) => sketch.meta)
		const animationData = cssAnimations.map(async ({slug, title, count}) => {
			const animationAssets: Promise<any>[] = []
			for (let i = 0; i < count; i++) {
				animationAssets.push(images.getImageData('play', `${slug}-${i + 1}`))
			}
			const assets = await Promise.all(animationAssets)
			const mediaData = assets.map((asset) => {
				return {
					src: `/${asset.json.path}/${asset.json.file}`,
					...asset.json,
					sources: asset.json.sources,
				}
			})
			return {slug, title, media: mediaData}
		})
		const animations = await Promise.all(animationData)
		let content = await pages.fetchMarkdowns(page)

		if (!content?.length) {
			throw error(404, {message: 'Not found'})
		}
		content = content[0]

		if (!content?.meta) {
			throw error(404, {message: 'Not found'})
		}

		const data = {
			sketches,
			animations,
			content,
		}

		return data
	} catch (e) {
		console.log(e)

		error(500, 'Error loading play data')
	}
}
