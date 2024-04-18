import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

const production = process.env.NODE_ENV === 'production'

/**
 * This config will preprocess scss in `src/lib/scss/` and output a bundled CSS file to "src/mixins/index.css"
 */
export default {
	input: 'src/lib/scss/index.js',
	output: {dir: 'src/lib/css/mixins/', format: 'esm'},
	plugins: [
		scss({
			fileName: 'index.css',
			processor: () => postcss([autoprefixer()]),
			// processor: () => postcss([autoprefixer({overrideBrowserslist: 'Edge 18'})]),
			watch: 'src/lib/scss',
		}), // will output compiled styles to "src/lib/css/mixins/main.css",
	],
}
