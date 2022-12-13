import imagemin from 'imagemin'
import imageminWebp from 'imagemin-webp'
;(async () => {
	await imagemin(['tmp/images/*.{jpg,png}'], {
		destination: 'data/images',
		plugins: [imageminWebp({quality: 65})],
	})

	console.log('Images optimized')
})()
