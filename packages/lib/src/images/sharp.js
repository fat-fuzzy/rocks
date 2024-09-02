// Create a pipeline that will download an image, resize it and format it to different files
// Using Promises to know when the pipeline is complete
import fs from 'node:fs'
import got from 'got'
import sharp from 'sharp'

const sharpStream = sharp({failOn: 'none'})

// TODO: Strip image metadata
// TODO: Generate content metadata

const promises = []
const images = [
	{file: 'road-to-happy-path', width: 1645, height: 2465, paths: ['images']},
	{
		file: '001-intro',
		width: 2647,
		height: 1869,
		paths: ['images/day', 'images/night'],
	},
]
const sizes = [500, 1000, 1500, 2000]
const host = 'http://localhost:5173'

function optimize() {
	images.forEach(({file, width, height, paths}) => {
		paths.forEach((path) => {
			promises.push(
				sharpStream
					.clone()
					.jpeg({quality: 100})
					.toFile(`./out/${path}/${file}.jpg`),
			)
			sizes.forEach((size) => {
				promises.push(
					sharpStream
						.clone()
						.resize({width: size})
						.jpeg({quality: 80})
						.toFile(`./out/${path}/${file}-${size}.jpg`),
				)

				promises.push(
					sharpStream
						.clone()
						.resize({width: size})
						.webp({quality: 80})
						.toFile(`./out/${path}/${file}-${size}.webp`),
				)
			})
			// https://github.com/sindresorhus/got/blob/main/documentation/3-streams.md
			got
				.stream(`${host}/${path}/${file}-${width}-${height}.webp`)
				.pipe(sharpStream)
		})
	})

	Promise.all(promises)
		.then((res) => {
			console.log('Done!', res)
		})
		.catch((err) => {
			console.error("Error processing files, let's clean it up", err)
			try {
				fs.unlinkSync('originalFile.jpg')
				fs.unlinkSync('optimized-500.jpg')
				fs.unlinkSync('optimized-500.webp')
			} catch (e) {}
		})
}

export default optimize()
