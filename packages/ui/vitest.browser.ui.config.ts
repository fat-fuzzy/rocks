import {defineConfig} from 'vitest/config'
import {playwright} from '@vitest/browser-playwright'
import {sveltekit} from '@sveltejs/kit/vite'
import {ALIAS_BASE, TEST_CONFIG_BASE} from './vitest.browser.config'

export const COVERAGE_BASE = {
	enabled: true,
	include: [
		'src/lib/**/browser/**/*.{js,ts}',
		'src/lib/components/**/*.svelte',
		'src/lib/components/**/*.svelte.{js,ts}',
	],
	exclude: [
		'src/app.d.ts',
		'src/**/definitions.{js,ts}',
		'src/lib/types/*.{js,ts}',
	],
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
