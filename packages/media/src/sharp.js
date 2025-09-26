// Create a pipeline that will download an image, resize it and format it to different files
// Using Promises to know when the pipeline is complete
// src: https://sharp.pixelplumbing.com/api-constructor
import fs from 'node:fs'
import got from 'got'
import sharp from 'sharp'
import config from './config.js'

const sharpStream = sharp({failOn: 'none'})
let promises = []

const images = [
	{
		file: 'webgl-scene',
		ext: 'jpg',
		width: 1646,
		height: 1047,
		path: 'images/media',
	},
	{
		file: 'drawing-about-drawing',
		ext: 'png',
		width: 2732,
		height: 2048,
		path: 'images/media',
	},
	{
		file: 'css-taco',
		ext: 'png',
		width: 606,
		height: 213,
		path: 'images/media',
	},
	{
		file: 'road-to-happy-path',
		ext: 'jpeg',
		width: 1645,
		height: 2465,
		path: 'images/media',
	},
	{
		file: '001-intro',
		ext: 'png',
		width: 2647,
		height: 1869,
		path: 'images/day',
	},
	{
		file: '001-intro',
		ext: 'png',
		width: 2647,
		height: 1869,
		path: 'images/night',
	},
	{
		file: 'Fat-Fuzzy-1',
		ext: 'png',
		width: 2732,
		height: 1708,
		path: 'images/fat-fuzzy/all',
	},
	{
		file: 'Fat-Fuzzy-2',
		ext: 'png',
		width: 2732,
		height: 1708,
		path: 'images/fat-fuzzy/all',
	},
	{
		file: 'Fat-Fuzzy-3',
		ext: 'png',
		width: 2732,
		height: 1708,
		path: 'images/fat-fuzzy/all',
	},
	{
		file: 'Fat-Fuzzy-4',
		ext: 'png',
		width: 2732,
		height: 1708,
		path: 'images/fat-fuzzy/all',
	},
	{
		file: 'Fat-Fuzzy-5',
		ext: 'png',
		width: 2732,
		height: 1708,
		path: 'images/fat-fuzzy/all',
	},
]

const host = 'http://localhost:5173'
let filePath = 0

// TODO: use this to generate sizes & media queries
// TODO: Generate 2x responsive images
function optimize(sharpStream, image, config) {
	const {file, ext, width, height, path} = image
	const {srcset} = config

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

	promises.push(
		sharpStream
			.clone()
			.png({quality: 100})
			.toFile(`./out/${filePath}-${width}-${height}.${ext}`),
	)
	promises.push(
		sharpStream
			.clone()
			.webp({quality: 100})
			.toFile(`./out/${filePath}-${width}-${height}.webp`),
	)
	// https://github.com/sindresorhus/got/blob/main/documentation/3-streams.md
	got.stream(`${host}/${filePath}-${width}-${height}.${ext}`).pipe(sharpStream)

	Promise.all(promises)
		.then((res) => {
			res.pop()
			console.log(
				JSON.stringify({
					id: filePath,
					...image,
					...config,
					sources: res,
				}),
			)
		})
		.catch((err) => {
			console.error("Error processing files, let's clean it up", err)
			try {
				fs.unlinkSync(`./out/${path}/${file}-${width}-${height}.${ext}`)
				fs.unlinkSync(`./out/${path}/${file}-${width}-${height}.webp`)

				srcset.forEach((src) => {
					fs.unlinkSync(`./out/${path}/${file}-${src.width}.${ext}`)
					fs.unlinkSync(`./out/${path}/${file}-${src.width}.webp`)
				})
			} catch (e) {}
		})
}

// Generate images 0 to 7 (10)
// Generate images 0 to 10
function main() {
	optimize(sharpStream, images[0], config)
}

export default main()
