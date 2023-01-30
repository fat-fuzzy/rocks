import {sveltekit} from '@sveltejs/kit/vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import type {UserConfig} from 'vite'

const config: UserConfig = {
	plugins: [
		sveltekit(),
		svelte({
			include: /\.wc\.svelte$/ as any,
			compilerOptions: {
				customElement: true,
			},
		}),
		svelte({
			include: /\.svelte$/ as any,
			compilerOptions: {
				customElement: false,
			},
		}),
	],
}

export default config
