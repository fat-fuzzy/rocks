import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

const inCssTokens = 'src/lib/styles/scss/tokens/'
const outCssTokens = 'static/styles/css/'

/**
 * TODO: Import token in own link tag (maybe)
 */
export default {
	input: `${inCssTokens}index.js`,
	output: {dir: outCssTokens, format: 'esm'},
	plugins: [
		scss({
			fileName: 'tokens.css',
			processor: () => postcss([autoprefixer()]),
			// processor: () => postcss([autoprefixer({overrideBrowserslist: 'Edge 18'})]),
			watch: 'src/scss/tokens/',
		}), // will output compiled styles to "assets/output-123hash.css"
	],
}
