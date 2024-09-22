import assetsUtils from './assets'

// Assets are only generated in client build, but the current markdown pipeline
// only references the assets in the server build. So no assets are emitted.
// This file is imported by +layout.svelte, which Vite will crawl in the client
// build and generate the assets.

// original src: https://github.com/bluwy/website/blob/f1aab96779efede611f91db93f9114f86c2cf105/src/data/assets.js

const dayImagesPrefix = '/src/assets/images/day/'
const nightImagesPrefix = '/src/assets/images/night/'
const blogImagesPrefix = '/src/assets/images/blog/'
const playImagesPrefix = '/src/assets/images/play/'

const dayImagesImports = import.meta.glob('/src/assets/images/day/*.json')
const nightImagesImports = import.meta.glob('/src/assets/images/night/*.json')
const blogImagesImports = import.meta.glob('/src/assets/images/blog/*.json')
const playImagesImports = import.meta.glob('/src/assets/images/play/*.json')

const [day, night, blog, play] = await Promise.all([
	assetsUtils.fetchJson(dayImagesPrefix, dayImagesImports),
	assetsUtils.fetchJson(nightImagesPrefix, nightImagesImports),
	assetsUtils.fetchJson(blogImagesPrefix, blogImagesImports),
	assetsUtils.fetchJson(playImagesPrefix, playImagesImports),
])

export async function getImageData(folder: string, slug: string) {
	switch (folder) {
		case 'day':
			return day.find((image: any) => image.path === slug)
		case 'night':
			return night.find((image: any) => image.path === slug)
		case 'blog':
			return blog.find((image: any) => image.path === slug)
		case 'play':
			return play.find((image: any) => image.path === slug)
		default:
			return null
	}
}

export default {getImageData}
