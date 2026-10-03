import path from 'node:path'
import {defineConfig} from 'vitest/config'
import {sveltekit} from '@sveltejs/kit/vite'
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'
import adapter from '@sveltejs/adapter-cloudflare'
import {playwright} from '@vitest/browser-playwright'
import {mdsvex} from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import {TEST_CONFIG_BASE} from './vitest.browser.config'

export const COVERAGE_BASE = {
	enabled: true,
	include: [
		'src/lib/**/browser/**/*.{js,ts}',
		'src/lib/ui/**/*.svelte',
		'src/lib/ui/**/*.svelte.{js,ts}',
	],
	exclude: [
		'src/app.d.ts',
		'src/**/definitions.{js,ts}',
		'src/lib/types/*.{js,ts}',
	],
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
				$schemas: path.resolve('./src/schemas'),
			},
		}),
	],
	test: {
		...TEST_CONFIG_BASE,
		reporters: ['html'],
		name: 'browser',
		browser: {
			enabled: true,
			// https://vitest.dev/config/browser/playwright
			provider: playwright(),
			instances: [{browser: 'chromium'}],
		},
		coverage: {
			provider: 'v8',
			...COVERAGE_BASE,
		},
	},
	optimizeDeps: {
		exclude: ['chromium-bidi'],
	},
})
