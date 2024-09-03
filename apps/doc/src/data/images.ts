import assetsUtils from './assets'

// Assets are only generated in client build, but the current markdown pipeline
// only references the assets in the server build. So no assets are emitted.
// This file is imported by +layout.svelte, which Vite will crawl in the client
// build and generate the assets.

// original src: https://github.com/bluwy/website/blob/f1aab96779efede611f91db93f9114f86c2cf105/src/data/assets.js

// ts-ignore
// const pageImages = import.meta.glob('../assets/images/pages/*.{png,jpg, svg}')

const dayImagesPrefix = '/src/assets/images/day/'
const nightImagesPrefix = '/src/assets/images/night/'
const blogImagesPrefix = '/src/assets/images/blog/'

const dayImagesImports = import.meta.glob('/src/assets/images/day/*.json')
const nightImagesImports = import.meta.glob('/src/assets/images/night/*.json')
const blogImagesImports = import.meta.glob('/src/assets/images/blog/*.json')

const [day, night, blog] = await Promise.all([
	assetsUtils.fetchJson(dayImagesPrefix, dayImagesImports),
	assetsUtils.fetchJson(nightImagesPrefix, nightImagesImports),
	assetsUtils.fetchJson(blogImagesPrefix, blogImagesImports),
])

// const imageDayPath = '../assets//images/day/001-intro.json'
// const imageNightPath = '../assets//images/day/001-intro.json'

// const dayImageData = require(imageDayPath)
// const nightImageData = require(imageNightPath)
// // The last generated image is the fallback image
// // so we remove it from teh sources array
// dayImageData.sources.pop()
// nightImageData.sources.pop()

export async function getImageData(folder: string, slug: string) {
	switch (folder) {
		case 'day':
			return day.find((image: any) => image.path === slug)
		case 'night':
			return night.find((image: any) => image.path === slug)
		case 'blog':
			return blog.find((image: any) => image.path === slug)
		default:
			return null
	}
}

export default {getImageData}
