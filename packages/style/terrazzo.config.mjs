import {defineConfig} from '@terrazzo/cli'
import pluginCSS from '@terrazzo/plugin-css'
import pluginJS from '@terrazzo/plugin-js'
import pluginAssetsEmoji from './src/lib/plugins/assets-emoji.js'
import pluginAssetsSvg from './src/lib/plugins/assets-svg.js'

const paths = {
	in: './src/lib/tokens/',
	out: './src/lib/css/variables/',
}

const files = [
	'border.json',
	'color.json',
	'icons.json',
	'layout.json',
	'pages.json',
	'scale.json',
	'font.json',
	'settings.json',
	'assets-emoji.json',
	'assets-svg.json',
]

export default defineConfig({
	tokens: files.map((file) => `${paths.in}${file}`),
	plugins: [
		pluginCSS({
			transform(token, mode) {
				switch (token.$type) {
					case 'derived': {
						return String(token.$value)
					}
					case 'percentage': {
						return `${String(token.$value)}%`
					}
					case 'char': {
						return token.$value
					}
					default:
						break
				}
			},
		}),
		pluginJS({
			js: 'variables.js',
		}),
		pluginAssetsEmoji({
			js: 'assets-emoji.js',
		}),
		pluginAssetsSvg({
			js: 'assets-svg.js',
		}),
	],
	outDir: paths.out,
	lint: {
		/** @see https://terrazzo.app/docs/cli/lint */
	},
})
