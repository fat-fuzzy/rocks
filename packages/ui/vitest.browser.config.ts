import path from 'path'
import {defineConfig} from 'vitest/config'
import {sveltekit} from '@sveltejs/kit/vite'
import adapter from '@sveltejs/adapter-auto'
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'
import {playwright} from '@vitest/browser-playwright'
import {mdsvex} from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'

export const ALIAS_BASE = {
	$types: path.resolve('./src/lib/types/index.ts'),
	$tests: path.resolve('./tests'),
}

export const TEST_CONFIG_BASE = {
	setupFiles: ['vitest-browser-svelte'],
	include: [path.resolve('./tests/browser/**/*.{test,spec}.ts')],
}

export default defineConfig({
	plugins: [
		sveltekit({
			// Consult https://kit.svelte.dev/docs/integrations#preprocessors
			// for more information about preprocessors
			preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
			// See https://kit.svelte.dev/docs/adapters for more information about adapters.
			adapter: adapter(),
			alias: {
				$config: path.resolve('./src/config'),
				$types: path.resolve('./src/lib/types/index.ts'),
				$tests: path.resolve('./tests'),
				$lib: path.resolve('./src/lib'),
			},
			extensions: ['.svelte', '.md', '.svx'],
		}),
	],
	resolve: {
		alias: ALIAS_BASE,
	},
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
