import path from 'path'

import adapter from '@sveltejs/adapter-auto'
import {sveltekit} from '@sveltejs/kit/vite'
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'
import {defineConfig} from 'vitest/config'

export default defineConfig({
	plugins: [
		sveltekit({
			// Consult https://kit.svelte.dev/docs/integrations#preprocessors
			// for more information about preprocessors
			preprocess: vitePreprocess(),
			// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
			// If your environment is not supported or you settled on a specific environment, switch out the adapter.
			// See https://kit.svelte.dev/docs/adapters for more information about adapters.
			adapter: adapter(),
			alias: {
				$types: path.resolve('./src/lib/types/index.ts'),
				$utils: path.resolve('./src/utils'),
				$data: path.resolve('./src/data'),
				$stores: path.resolve('./src/lib/stores'),
				$lib: path.resolve('./src/lib'),
			},
			extensions: ['.svelte'],
		}),
	],
	test: {
		include: ['tests/**/*.{test,spec}.{js,ts}'],
	},
	build: {
		target: 'esnext',
	},
})
