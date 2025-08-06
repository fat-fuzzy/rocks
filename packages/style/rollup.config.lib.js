import * as glob from 'glob'
import postcss from 'rollup-plugin-postcss'
import scss from 'rollup-plugin-scss'
import postcssPresetEnv from 'postcss-preset-env'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import fs from 'node:fs'
import path from 'node:path'

const production = process.env.NODE_ENV === 'production'
const inDir = path.resolve('src/lib')
const outDir = path.resolve('dist')
const cssFiles = glob.sync('src/lib/css/**/*.css')

/**
 * This config will preserve folder structure of source files (scss and css, not json) and output a css library in "dist/lib/"
 */
export default {
	input: `${inDir}/index.js`,
	output: {dir: outDir, format: 'esm'},
	plugins: [
		scss({
			input: cssFiles,
			output: function (styles, styleNodes) {
				Object.entries(styleNodes).forEach(([id, content]) => {
					const outputPath = path.join('dist', path.relative('src', id))
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
