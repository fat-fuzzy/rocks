// import * as sass from 'sass'

// const scssFilename = './scss/theme/tokens/_index.scss'
// const result = sass.compile(scssFilename, {sourceMap: true})
// console.log('CSS result')
// console.log(result)
// const compressed = sass.compile(scssFilename, {style: 'compressed'})
// console.log('CSS compressed')
// console.log(compressed)

export default async (app) => {
	switch (app) {
		case 'doc':
			await import('./styles/doc')
			break
		case 'play':
			await import('./styles/play')
			break
		case 'tokens':
			await import('./styles/tokens')
			break
		case 'ui':
			await import('./styles/ui')
			break
	}
}
