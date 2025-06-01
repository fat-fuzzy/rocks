import scss from 'rollup-plugin-scss'
import path from 'node:path'
const inDir = path.resolve('src/lib/scss')
const outDir = path.resolve('src/lib/css/mixins/')

/**
 * This config will preprocess scss in `src/lib/scss/` and output a bundled CSS file to "src/mixins/index.css"
 */
export default {
	input: `${inDir}/index.js`,
	output: {dir: outDir, format: 'esm'},
	plugins: [
		scss({
			fileName: 'index.css',
		}), // will output compiled styles to "src/lib/css/mixins/main.css",
	],
}
