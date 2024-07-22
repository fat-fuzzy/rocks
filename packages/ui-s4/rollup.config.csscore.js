import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

/**
 * Preprocess scss in `src/styles/` to use css directly in svelte components
 */
export default {
	input: 'src/lib/styles/scss/core/index.js',
	output: {dir: 'src/lib/styles/css/core/', format: 'esm'},
	plugins: [
		scss({
			fileName: 'main.css',
			processor: () => postcss([autoprefixer()]),
			// processor: () => postcss([autoprefixer({overrideBrowserslist: 'Edge 18'})]),
			watch: 'src/lib/styles/scss/',
		}), // will output compiled styles to "assets/output-123hash.css"
	],
}
