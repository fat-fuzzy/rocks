import path from 'node:path'
import {defineConfig} from 'vitest/config'
import {sveltekit} from '@sveltejs/kit/vite'
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'
import adapter from '@sveltejs/adapter-cloudflare'
import {playwright} from '@vitest/browser-playwright'
import {mdsvex} from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'

export const TEST_CONFIG_BASE = {
	setupFiles: ['vitest-browser-svelte'],
	include: ['tests/browser/**/*.{test,spec}.ts'],
}

export default defineConfig({
	plugins: [
		sveltekit({
			extensions: ['.svelte', '.md', '.svx'],

			// Consult https://github.com/sveltejs/svelte-preprocess
			// for more information about preprocessors
			preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter(),
			alias: {
				$config: path.resolve('./src/config'),
				$data: path.resolve('./src/data'),
				$schemas: path.resolve('./src/schemas'),
			},
		}),
	],
	test: {
		...TEST_CONFIG_BASE,
		reporters: ['dot'],
		name: 'browser',
		browser: {
			enabled: true,
			// https://vitest.dev/config/browser/playwright
			provider: playwright(),
			headless: true,
			instances: [
				{browser: 'chromium'},
				{browser: 'firefox'},
				{browser: 'webkit'},
			],
		},
	},
	optimizeDeps: {
		exclude: ['chromium-bidi'],
	},
})
