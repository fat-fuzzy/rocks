import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

/**
 * Use this library to experiment with styles for `[root]/package/ui`
 */
export default {
	input: 'src/apps/ui/index.js',
	output: {file: 'dist/ui/css/index.js', format: 'esm'},
	plugins: [
		scss({
			fileName: 'main.css',
			processor: () => postcss([autoprefixer()]),
			// processor: () => postcss([autoprefixer({overrideBrowserslist: 'Edge 18'})]),
			watch: 'src/apps/ui/',
		}), // will output compiled styles to "assets/output-123hash.css"
	],
}
