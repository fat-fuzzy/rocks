import fs from fs
import postcssBundler from '@csstools/postcss-bundler'
import postcssGlobalData from '@csstools/postcss-global-data'
import postcssJitProps from 'postcss-jit-props'
import postcssMinify from '@csstools/postcss-minify'
import postcssPresetEnv from 'postcss-preset-env'
// Always clean the dist folder before building.
fs.rmSync('./dist/css', {recursive: true, force: true})
fs.mkdirSync('./dist/css')

export default {
  map: NODE_ENV === 'production' ? false : true,
	plugins: [
		postcssBundler(),
		postcssGlobalData({
			files: ['./src/lib/css/tokens/tokens.css'],
		}),
		postcssJitProps(),
		postcssPresetEnv(),
		postcssMinify(),
	],
}
