// Create a pipeline that will download an image, resize it and format it to different files
// Using Promises to know when the pipeline is complete
// src: https://sharp.pixelplumbing.com/api-constructor
import fs from 'node:fs'
import got from 'got'
import sharp from 'sharp'

const sharpStream = sharp({failOn: 'none'})
let promises = []

const images = [
	{
		file: 'road-to-happy-path',
		ext: 'jpeg',
		width: 1645,
		height: 2465,
		path: 'images/blog',
		srcset: [
			{
				width: 2000,
				descriptors: [
					{mq: '(min-width: 667px)', dpr: 3},
					{mq: '(min-width: 1000px)', dpr: 2},
					{mq: '(min-width: 2000px)', dpr: 1},
				],
			},
			{
				width: 1500,
				descriptors: [
					{mq: '(min-width: 500px)', dpr: 3},
					{mq: '(min-width: 750px)', dpr: 2},
					{mq: '(min-width: 1000px)', dpr: 1},
				],
			},
			{
				width: 1000,
				descriptors: [
					{mq: '(min-width: 500px)', dpr: 2},
					{mq: '(min-width: 1000px)', dpr: 1},
				],
			},
			{
				width: 500,
				descriptors: [{mq: null, dpr: 1}],
			},
		],
		// See: packages/style/src/scss/mixins/mg/hero_section.scss
		// TODO: Organize sizes & media queries
		sizes: [
			{width: '1620px', size: '60vw'},
			{width: '1360px', size: '60vw'},
			{width: '935px', size: '70vw'},
			{width: null, size: '100%'},
		],
	},
	{
		file: '001-intro',
		ext: 'png',
		width: 2647,
		height: 1869,
		path: 'images/day',
		srcset: [
			{
				width: 2000,
				descriptors: [
					{mq: '(min-width: 667px)', dpr: 3},
					{mq: '(min-width: 1000px)', dpr: 2},
					{mq: '(min-width: 2000px)', dpr: 1},
				],
			},
			{
				width: 1500,
				descriptors: [
					{mq: '(min-width: 500px)', dpr: 3},
					{mq: '(min-width: 750px)', dpr: 2},
					{mq: '(min-width: 1000px)', dpr: 1},
				],
			},
			{
				width: 1000,
				descriptors: [
					{mq: '(min-width: 500px)', dpr: 2},
					{mq: '(min-width: 1000px)', dpr: 1},
				],
			},
			{
				width: 500,
				descriptors: [{mq: null, dpr: 1}],
			},
		],
		// See: packages/style/src/scss/mixins/mg/hero_section.scss
		// TODO: Organize sizes & media queries
		sizes: [
			{width: '1620px', size: '60vw'},
			{width: '1360px', size: '60vw'},
			{width: '935px', size: '70vw'},
			{width: null, size: '100%'},
		],
	},
	{
		file: '001-intro',
		ext: 'png',
		width: 2647,
		height: 1869,
		path: 'images/night',
		srcset: [
			{
				width: 2000,
				descriptors: [
					{mq: '(min-width: 667px)', dpr: 3},
					{mq: '(min-width: 1000px)', dpr: 2},
					{mq: '(min-width: 2000px)', dpr: 1},
				],
			},
			{
				width: 1500,
				descriptors: [
					{mq: '(min-width: 500px)', dpr: 3},
					{mq: '(min-width: 750px)', dpr: 2},
					{mq: '(min-width: 1000px)', dpr: 1},
				],
			},
			{
				width: 1000,
				descriptors: [
					{mq: '(min-width: 500px)', dpr: 2},
					{mq: '(min-width: 1000px)', dpr: 1},
				],
			},
			{
				width: 500,
				descriptors: [{mq: null, dpr: 1}],
			},
		],
		// See: packages/style/src/scss/mixins/mg/hero_section.scss
		// TODO: Organize sizes & media queries
		sizes: [
			{width: '1620px', size: '60vw'},
			{width: '1360px', size: '60vw'},
			{width: '935px', size: '70vw'},
			{width: null, size: '100%'},
		],
	},
]

const host = 'http://localhost:5173'
let filePath = 0

// TODO: use this to generate sizes & media queries
// TODO: Generate 2x responsive images
function optimize(sharpStream, image) {
	const {file, ext, width, height, path, srcset} = image

	filePath = `${path}/${file}`

	srcset.forEach((src) => {
		if (src.width > width) return

		promises.push(
			sharpStream
				.clone()
				.resize({width: src.width})
				.webp({quality: 80})
				.toFile(`./out/${filePath}-${src.width}.webp`),
		)

		if (ext === 'jpeg' || ext === 'jpg') {
			promises.push(
				sharpStream
					.clone()
					.resize({width: src.width})
					.jpeg({quality: 80})
					.toFile(`./out/${filePath}-${src.width}.${ext}`),
			)
		}
		if (ext === 'png') {
			promises.push(
				sharpStream
					.clone()
					.resize({width: src.width})
					.png({quality: 80})
					.toFile(`./out/${filePath}-${src.width}.${ext}`),
			)
		}
	})

	if (ext === 'jpeg' || ext === 'jpg') {
		promises.push(
			sharpStream
				.clone()
				.jpeg({quality: 100})
				.toFile(`./out/${filePath}-${width}-${height}.${ext}`),
		)
	}
	if (ext === 'png') {
		promises.push(
			sharpStream
				.clone()
				.png({quality: 100})
				.toFile(`./out/${filePath}-${width}-${height}.${ext}`),
		)
	}
	// https://github.com/sindresorhus/got/blob/main/documentation/3-streams.md
	got.stream(`${host}/${filePath}-${width}-${height}.${ext}`).pipe(sharpStream)

	Promise.all(promises)
		.then((res) => {
			res.pop()
			console.log(
				JSON.stringify({
					...image,
					sources: res,
				}),
			)
		})
		.catch((err) => {
			console.error("Error processing files, let's clean it up", err)
			try {
				fs.unlinkSync(`./out/${path}/${file}-${width}-${height}.${ext}`)

				sizes.forEach((size) => {
					fs.unlinkSync(`./out/${path}/${file}-${src.width}.${ext}`)
					fs.unlinkSync(`./out/${path}/${file}-${src.width}.webp`)
				})
			} catch (e) {}
		})
}

function main() {
	optimize(sharpStream, images[0])
}

export default main()
