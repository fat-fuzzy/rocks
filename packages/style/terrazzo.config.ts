import {defineConfig} from '@terrazzo/cli'
import pluginCSS from '@terrazzo/plugin-css'
import pluginJS from '@terrazzo/plugin-js'
import pluginAssetsEmoji from './src/lib/tokens/plugins/assets-emoji.js'
import pluginAssetsSvg from './src/lib/tokens/plugins/assets-svg.js'

const paths = {
	in: './src/lib/tokens/definitions',
	out: './src/lib/css/variables',
}

const files = [
	'assets-emoji.json',
	'assets-svg.json',
	'scale.json',
	'layout.json',
	'settings.json',
	'font.json',
	'border.json',
	'outline.json',
	'color.json',
	'shadow.json',
	'icons.json',
	'pages.json',
	'motion.json',
]

const tokens = files.map((file) => `${paths.in}/${file}`)

export default defineConfig({
	tokens: tokens,
	plugins: [
		pluginCSS(),
		pluginJS({
			filename: 'variables.js',
		}),
		pluginAssetsEmoji(),
		pluginAssetsSvg(),
	],
	outDir: paths.out,
	lint: {
		build: {enabled: true},
		rules: {
			'core/valid-color': 'error',
			'core/valid-dimension': 'error',
			'core/valid-font-family': 'error',
			'core/valid-font-weight': 'error',
			'core/valid-duration': 'error',
			'core/valid-cubic-bezier': 'error',
			'core/valid-number': 'error',
			'core/valid-link': 'error',
			'core/valid-boolean': 'error',
			'core/valid-string': 'error',
			'core/valid-stroke-style': 'error',
			'core/valid-border': 'error',
			'core/valid-transition': 'error',
			'core/valid-shadow': 'error',
			'core/valid-gradient': 'error',
			'core/valid-typography': 'error',
			'core/consistent-naming': 'warn',
		},
	},
})
