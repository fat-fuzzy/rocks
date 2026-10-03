import {defineConfig} from 'vitest/config'
import {sveltekit} from '@sveltejs/kit/vite'
import adapter from '@sveltejs/adapter-auto'
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'
import {mdsvex} from 'mdsvex'

export default defineConfig({
	plugins: [
		sveltekit({
			// Consult https://svelte.dev/docs/kit/integrations
			// for more information about preprocessors
			preprocess: [vitePreprocess(), mdsvex()],
			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter(),
			extensions: ['.svelte', '.svx'],
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
				'src/lib/editor/',
			],
		},
	},
})
