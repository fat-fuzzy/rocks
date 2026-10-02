import path from 'node:path'

import adapter from '@sveltejs/adapter-auto'
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'
import {sveltekit} from '@sveltejs/kit/vite'
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
				$utils: path.resolve('./src/utils'),
				$data: path.resolve('./src/data'),
				$stores: path.resolve('./src/lib/stores'),
				$types: path.resolve('./src/lib/types/index.ts'),
				$lib: path.resolve('./src/lib'),
			},
		}),
	],
	test: {
		reporters: ['html'],
		include: ['tests/unit/**/*.{test,spec}.{js,ts}'],
		coverage: {
			enabled: true,
			provider: 'v8',
			include: ['src/**/*.{js,ts}'],
			exclude: [
				'src/app.d.ts',
				'src/**/browser/*.{js,ts}',
				'src/**/definitions.{js,ts}',
				'src/lib/types/*.{js,ts}',
				'src/lib/**/*.browser.ts',
				'src/lib/index.ts',
				'src/lib/components/',
			],
		},
	},
	build: {
		commonjsOptions: {
			transformMixedEsModules: true,
		},
	},
})
