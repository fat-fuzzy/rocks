import {defineConfig} from '@terrazzo/cli'
import pluginCSS from '@terrazzo/plugin-css'
import pluginJS from '@terrazzo/plugin-js'
import pluginAssetsEmoji from './src/lib/tokens/plugins/assets-emoji.js'
import pluginAssetsSvg from './src/lib/tokens/plugins/assets-svg.js'

const paths = {
	in: './src/lib/tokens/definitions/',
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
			transform(token) {
				switch (token.$type) {
					case 'string': {
						return token.$value
					}
					default:
						break
				}
			},
		}),
		pluginJS({
			filename: 'variables.js',
		}),
		pluginAssetsEmoji(),
		pluginAssetsSvg(),
	],
	outDir: paths.out,
	lint: {
		/** @see https://terrazzo.app/docs/cli/lint */
	},
})
