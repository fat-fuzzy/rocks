import {defineConfig} from 'vitest/config'
import {playwright} from '@vitest/browser-playwright'
import {sveltekit} from '@sveltejs/kit/vite'
import {
	ALIAS_BASE,
	TEST_CONFIG_BASE,
	COVERAGE_BASE,
} from './vitest.browser.config'

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
