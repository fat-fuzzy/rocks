import type {UserConfig} from 'vite'
import {sveltekit} from '@sveltejs/kit/vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import browserslist from 'browserslist'
import {browserslistToTargets} from 'lightningcss'

const config: UserConfig = {
	plugins: [
		sveltekit(),
		svelte({
			include: /\.wc\.svelte$/ as any,
			compilerOptions: {
				customElement: true,
			},
		}),
	],
	css: {
		devSourcemap: true,
		transformer: 'lightningcss',
		lightningcss: {
			targets: browserslistToTargets(browserslist('>= 0.25%')),
		},
	},
	build: {
		cssMinify: 'lightningcss',
	},
}

export default config
