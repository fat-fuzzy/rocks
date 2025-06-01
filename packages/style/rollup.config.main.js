import scss from 'rollup-plugin-scss'
import * as sass from 'sass'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import postcssBundler from '@csstools/postcss-bundler'
import postcssGlobalData from '@csstools/postcss-global-data'
import postcssJitProps from 'postcss-jit-props'
import postcssMinify from '@csstools/postcss-minify'
import postcssPresetEnv from 'postcss-preset-env'
import path from 'node:path'

const production = process.env.NODE_ENV === 'production'
const inDir = path.resolve('src/lib')
const outDir = path.resolve('dist')

/**
 * This config will output 1 bundled CSS file to "dist/main.css"
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
			plugins: [
				postcssBundler(),
				postcssGlobalData({
					files: [`${inDir}/css/tokens/tokens.css`],
				}),
				postcssJitProps({
					files: [`${inDir}/css/*/**/*.css`],
				}),
				postcssPresetEnv(),
				postcssMinify(),
				autoprefixer(),
			],
			minimize: production,
			sourceMap: !production,
		}),
	],
}
