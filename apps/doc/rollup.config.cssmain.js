import scss from 'rollup-plugin-scss'
import * as sass from 'sass'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'
import cssnano from 'cssnano'
import postcssPresetEnv from 'postcss-preset-env'
import path from 'node:path'

const production = process.env.NODE_ENV === 'production'
const inDir = path.resolve('src/lib/styles/css')
const outDir = path.resolve('static/styles')

/**
 * This config will output 1 bundled CSS file to "static/styles/main.css"
 */
export default {
	input: `${inDir}/index.js`,
	output: {dir: outDir, format: 'esm'},
	plugins: [
		scss({
			fileName: 'main.css',
			sass: sass,
		}), // will output compiled styles to "dist/main.css",
		postcss({
			extract: true,
			plugins: [postcssImport(), postcssPresetEnv(), autoprefixer(), cssnano()],
			minimize: production,
			sourceMap: !production,
		}),
	],
}
