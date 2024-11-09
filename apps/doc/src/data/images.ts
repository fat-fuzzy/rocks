import assetsUtils from './assets'

// Assets are only generated in client build, but the current markdown pipeline
// only references the assets in the server build. So no assets are emitted.
// This file is imported by +layout.svelte, which Vite will crawl in the client
// build and generate the assets.

// original src: https://github.com/bluwy/website/blob/f1aab96779efede611f91db93f9114f86c2cf105/src/data/assets.js

const dayImagesPrefix = '/src/assets/images/day/'
const nightImagesPrefix = '/src/assets/images/night/'
const mediaImagesPrefix = '/src/assets/images/media/'
const homeImagesPrefix = '/src/assets/images/home/'

const dayImagesImports = import.meta.glob('/src/assets/images/day/*.json')
const nightImagesImports = import.meta.glob('/src/assets/images/night/*.json')
const mediaImagesImports = import.meta.glob('/src/assets/images/media/*.json')
const homeImagesImports = import.meta.glob('/src/assets/images/home/*.json')

const [day, night, media, home] = await Promise.all([
	assetsUtils.fetchJson(dayImagesPrefix, dayImagesImports),
	assetsUtils.fetchJson(nightImagesPrefix, nightImagesImports),
	assetsUtils.fetchJson(mediaImagesPrefix, mediaImagesImports),
	assetsUtils.fetchJson(homeImagesPrefix, homeImagesImports),
])

export async function getImageData(folder: string, slug: string) {
	switch (folder) {
		case 'day':
			return day.find((image: any) => image.path === slug)
		case 'night':
			return night.find((image: any) => image.path === slug)
		case 'media':
			return media.find((image: any) => image.path === slug)
		case 'home':
			return home.find((image: any) => image.path === slug)
		default:
			return null
	}
}

export default {getImageData}
