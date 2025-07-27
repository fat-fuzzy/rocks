import {defineConfig} from '@terrazzo/cli'
import css from '@terrazzo/plugin-css'

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
]

export default defineConfig({
	tokens: files.map((file) => `${paths['in']}${file}`),
	plugins: [
		css({
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
	],
	outDir: paths['out'],
	lint: {
		/** @see https://terrazzo.app/docs/cli/lint */
	},
})
