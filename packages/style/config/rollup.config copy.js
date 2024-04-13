import {nodeResolve} from '@rollup/plugin-node-resolve'
import scss from 'rollup-plugin-scss'
import sass from 'sass';
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import fs from 'fs'
import postcssBundler from '@csstools/postcss-bundler'
import postcssGlobalData from '@csstools/postcss-global-data'
import postcssJitProps from 'postcss-jit-props'
import postcssMinify from '@csstools/postcss-minify'
import postcssPresetEnv from 'postcss-preset-env'


const production = process.env.NODE_ENV === 'production';

// Always clean the dist folder before building.
fs.rmSync('dist/', {recursive: true, force: true})
fs.mkdirSync('dist/')

export default {
	input: 'src/lib/index.js',
	output: {dir: 'dist/', format: 'esm'},
	plugins: [
		nodeResolve(),
		scss({
			output: function(styles, styleNodes) {
				console.log(styles);
			},
			fileName: 'index.css',
			sass: sass,
			watch: 'src/lib',
		}), // will output compiled styles to "dist/index.css",
		postcss({
			extract: 'dist/main.css',
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
				// Add more PostCSS plugins here as needed,
				autoprefixer()],
			minimize: production,
		}),
	],
}
