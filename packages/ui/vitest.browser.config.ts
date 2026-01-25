import {defineConfig} from 'vitest/config'
import {playwright} from '@vitest/browser-playwright'
import {sveltekit} from '@sveltejs/kit/vite'
import path from 'path'

export const ALIAS_BASE = {
	$stores: path.resolve('./src/lib/stores'),
	$utils: path.resolve('./src/utils'),
	$data: path.resolve('./src/data'),
	$types: path.resolve('./src/lib/types/index.ts'),
	$tests: path.resolve('./tests'),
}

export const TEST_CONFIG_BASE = {
	reporters: ['html'],
	setupFiles: ['vitest-browser-svelte'],
	include: ['tests/browser/**/*.{test,spec}.ts'],
}

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: ALIAS_BASE,
	},
	test: {
		...TEST_CONFIG_BASE,
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
