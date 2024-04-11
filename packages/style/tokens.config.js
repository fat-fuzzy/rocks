import pluginCSS from '@cobalt-ui/plugin-css'
import pluginJS from '@cobalt-ui/plugin-js'

const paths = {
	in: './src/tokens/',
	out: './src/css/tokens/',
}
const files = [
	'border.json',
	'color.json',
	'icons.json',
	'layout.json',
	'pages.json',
	'scale.json',
	'typography.json',
]
/** @type {import("@cobalt-ui/core").Config} */
export default {
	tokens: files.map((file) => `${paths['in']}${file}`),
	outDir: paths['out'],
	plugins: [
		pluginCSS({
			transform(token, mode) {
				switch (token.$type) {
					case 'percentage': {
						return `${String(token.$value)}%`
					}
					default:
						break
				}
			},
		}),
		pluginJS(/* options */),
	],
}
