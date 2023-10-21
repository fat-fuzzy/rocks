import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

/**
 * Use this library to experiment with styles for `[root]/apps/play`
 */
export default {
	input: 'src/apps/play/index.js',
	output: {file: 'dist/play/css/index.js', format: 'esm'},
	plugins: [
		scss({
			fileName: 'main.css',
			processor: () => postcss([autoprefixer()]),
			// processor: () => postcss([autoprefixer({overrideBrowserslist: 'Edge 18'})]),
			watch: 'src/apps/play/',
		}), // will output compiled styles to "assets/output-123hash.css"
	],
}
