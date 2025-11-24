import {createRequire} from 'node:module'
import fs from 'node:fs'
import path from 'node:path'
import * as glob from 'glob'
import terser from '@rollup/plugin-terser'
import postcss from 'rollup-plugin-postcss'
import scss from 'rollup-plugin-scss'
import postcssPresetEnv from 'postcss-preset-env'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

const require = createRequire(import.meta.url)
const pkg = require('./package.json')

const production = process.env.NODE_ENV === 'production'
const inDir = path.resolve('src/lib')
const outDir = path.resolve('dist')
const cssFiles = glob.sync('src/lib/css/**/*.css')

/**
 * This config will preserve folder structure of source files (scss and css, not json) and output a css library in "dist/lib/"
 */
export default {
	input: `${inDir}/index.js`,
	output: [
		{
			file: pkg.module,
			format: 'es',
			sourcemap: !production,
			plugins: [terser()],
		},
	],
	plugins: [
		scss({
			input: cssFiles,
			output: function (styles, styleNodes) {
				Object.entries(styleNodes).forEach(([id, content]) => {
					const outputPath = path.join(outDir, path.relative('src', id))
					fs.mkdirSync(path.dirname(outputPath), {recursive: true})
					fs.writeFileSync(outputPath, content)
				})
			}, // will output compiled styles to "dist/lib/**/*.css" as separate files including the folder structure. Use in conjunction with exports in package.json to expose css files
		}),
		postcss({
			extract: true,
			plugins: [postcssPresetEnv(), autoprefixer(), cssnano()],
			minimize: production,
			sourceMap: !production,
		}),
	],
}
