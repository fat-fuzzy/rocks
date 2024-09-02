// Create a pipeline that will download an image, resize it and format it to different files
// Using Promises to know when the pipeline is complete
// src: https://sharp.pixelplumbing.com/api-constructor
import fs from 'node:fs'
import got from 'got'
import sharp from 'sharp'

const sharpStream = sharp({failOn: 'none'})
let promises = []
const images = [
	// {
	// 	file: 'road-to-happy-path',
	// 	ext: 'jpeg',
	// 	width: 1645,
	// 	height: 2465,
	// 	path: 'images',
	// },
	// {
	// 	file: '001-intro',
	// 	ext: 'png',
	// 	width: 2647,
	// 	height: 1869,
	// 	path: 'images/day',
	// },
	{
		file: '001-intro',
		ext: 'png',
		width: 2647,
		height: 1869,
		path: 'images/night',
	},
]
const sizes = [
	{width: 2000, mq: '(min-width: 2000px)'},
	{width: 1500, mq: '(min-width: 1500px)'},
	{width: 1000, mq: '(min-width: 1000px)'},
	{width: 500, mq: '(min-width: 500px)'},
]
const host = 'http://localhost:5173'
let filePath = 0

function optimize(sharpStream, images) {
	images.forEach(({file, ext, width, height, path}) => {
		filePath = `${path}/${file}`

		sizes.forEach((size) => {
			if (size.width > width) return

			promises.push(
				sharpStream
					.clone()
					.resize({width: size.width})
					.webp({quality: 80})
					.toFile(`./out/${filePath}-${size.width}.webp`),
			)

			if (ext === 'jpeg' || ext === 'jpg') {
				promises.push(
					sharpStream
						.clone()
						.resize({width: size.width})
						.jpeg({quality: 80})
						.toFile(`./out/${filePath}-${size.width}.${ext}`),
				)
			}
			if (ext === 'png') {
				promises.push(
					sharpStream
						.clone()
						.resize({width: size.width})
						.png({quality: 80})
						.toFile(`./out/${filePath}-${size.width}.${ext}`),
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
		got
			.stream(`${host}/${filePath}-${width}-${height}.${ext}`)
			.pipe(sharpStream)

		Promise.all(promises)
			.then((res) => {
				res.pop()
				console.log(
					JSON.stringify({file, ext, width, height, path, sources: res}),
				)
			})
			.catch((err) => {
				console.error("Error processing files, let's clean it up", err)
				try {
					fs.unlinkSync(`./out/${path}/${file}-${width}-${height}.${ext}`)

					sizes.forEach((size) => {
						fs.unlinkSync(`./out/${path}/${file}-${size.width}.${ext}`)
						fs.unlinkSync(`./out/${path}/${file}-${size.width}.webp`)
					})
				} catch (e) {}
			})
	})
}

function main() {
	optimize(sharpStream, images)
}

//  node ./sharp.js > out/images/path/to/fileName.json
export default main()
