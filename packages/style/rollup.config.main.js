import scss from 'rollup-plugin-scss'
import * as sass from 'sass'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import postcssBundler from '@csstools/postcss-bundler'
import postcssGlobalData from '@csstools/postcss-global-data'
import postcssJitProps from 'postcss-jit-props'
import postcssMinify from '@csstools/postcss-minify'
import postcssPresetEnv from 'postcss-preset-env'

const production = process.env.NODE_ENV === 'production'

/**
 * This config will output 1 bundled CSS file to "dist/main.css"
 */
export default {
	input: 'src/lib/index.js',
	output: {dir: 'dist/', format: 'esm'},
	plugins: [
		scss({
			fileName: 'main.css',
			sass: sass,
			watch: 'src/lib',
		}), // will output compiled styles to "dist/main.css",
		postcss({
			extract: true,
			plugins: [
				postcssBundler(),
				postcssGlobalData({
					files: ['src/lib/css/tokens/tokens.css'],
				}),
				postcssJitProps({
					files: ['src/lib/css/tokens/tokens.css'],
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
