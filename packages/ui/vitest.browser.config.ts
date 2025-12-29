import {defineConfig} from 'vitest/config'
import {playwright} from '@vitest/browser-playwright'
import {sveltekit} from '@sveltejs/kit/vite'
import path from 'path'

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$stores: path.resolve('./src/lib/stores'),
			$utils: path.resolve('./src/utils'),
			$data: path.resolve('./src/data'),
			$types: path.resolve('./src/lib/types/index.ts'),
			$tests: path.resolve('./tests'),
		},
	},
	test: {
		reporters: ['html'],
		setupFiles: ['vitest-browser-svelte'],
		include: [
			'tests/browser/**/*.{test,spec}.ts',
			'tests/**/*.browser.{test,spec}.ts',
		],
		name: 'browser',
		browser: {
			enabled: true,
			// https://vitest.dev/config/browser/playwright
			provider: playwright(),
			instances: [{browser: 'chromium'}],
		},
		coverage: {
			enabled: true,
			provider: 'v8',
			exclude: [
				'src/app.d.ts',
				'src/**/definitions.{js,ts}',
				'src/lib/types/*.{js,ts}',
			],
		},
	},
	optimizeDeps: {
		exclude: ['chromium-bidi'],
	},
})
