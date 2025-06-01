import * as glob from 'glob'
import postcss from 'rollup-plugin-postcss'
import scss from 'rollup-plugin-scss'
import autoprefixer from 'autoprefixer'
import postcssBundler from '@csstools/postcss-bundler'
import postcssGlobalData from '@csstools/postcss-global-data'
import postcssJitProps from 'postcss-jit-props'
import postcssMinify from '@csstools/postcss-minify'
import postcssPresetEnv from 'postcss-preset-env'
import fs from 'node:fs'
import path from 'node:path'

const production = process.env.NODE_ENV === 'production'
const inDir = path.resolve('src/lib')
const outDir = path.resolve('dist')
const cssFiles = glob.sync('src/lib/css/**/*.css')

// Always clean the dist folder before building.
fs.rmSync(outDir, {recursive: true, force: true})
fs.mkdirSync(outDir)

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
			plugins: [
				postcssBundler(),
				postcssGlobalData({
					files: [`${inDir}/css/tokens/tokens.css`],
				}),
				postcssPresetEnv(),
				postcssMinify(),
				autoprefixer(),
				postcssJitProps({
					files: [`${inDir}/css/tokens/tokens.css`],
				}),
			],
			minimize: production,
			sourceMap: !production,
		}),
	],
}
