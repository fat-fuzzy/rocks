import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

const production = process.env.NODE_ENV === 'production'
/**
 * Preprocess scss in `src/styles/` to use css directly in svelte components
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
		}), // will output compiled styles to "assets/output-123hash.css"
	],
}
