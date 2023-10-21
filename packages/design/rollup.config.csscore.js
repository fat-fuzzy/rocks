import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

/**
 * Preprocess scss in `src/lib/` to export css library
 * Use this library to experiment with core css styles
 */
export default {
	input: 'src/lib/scss/core/index.js',
	output: {dir: 'src/lib/css/core/', format: 'esm'},
	plugins: [
		scss({
			fileName: 'main.css',
			processor: () => postcss([autoprefixer()]),
			// processor: () => postcss([autoprefixer({overrideBrowserslist: 'Edge 18'})]),
			watch: 'src/scss/core/',
		}), // will output compiled styles to "assets/output-123hash.css"
	],
}
