import pluginCSS from '@cobalt-ui/plugin-css'

const paths = {
	in: './src/lib/tokens/',
	out: './src/lib/css/base/',
}

const files = [
	'border.json',
	'color.json',
	'icons.json',
	'layout.json',
	'pages.json',
	'scale.json',
	'font.json',
]

/**
 * This config will process JSON files in `src/lib/tokens/` and output a CSS file to "src/lib/css/tokens/"
 */
/** @type {import("@cobalt-ui/core").Config} */
export default {
	tokens: files.map((file) => `${paths['in']}${file}`),
	outDir: paths['out'],
	plugins: [
		pluginCSS({
			transform(token, mode) {
				switch (token.$type) {
					case 'reference': {
						return String(token.$value)
					}
					case 'percentage': {
						return `${String(token.$value)}%`
					}
					default:
						break
				}
			},
		}),
	],
}
