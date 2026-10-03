import path from 'path'
import {defineConfig} from 'vitest/config'
import {sveltekit} from '@sveltejs/kit/vite'
import adapter from '@sveltejs/adapter-auto'
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'
import {mdsvex} from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'

// NOTE: if a test has not been cancelled properly it can leave a a process running on Svelte's preview port,
// and subsequent tests will not run. To fix this :
// - Find the process with the command: `lsof -i:4173`
// - Kill the process using the PID returned by the previous command: `kill -9 1234` (where `1234 is the PID)
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
			},
			extensions: ['.svelte', '.md', '.svx'],
		}),
	],
	test: {
		alias: {
			$config: path.resolve('./src/config'),
		},
		reporters: ['html'],
		include: [path.resolve('./tests/unit/**/*.{test,spec}.{js,ts}')],
		coverage: {
			enabled: true,
			provider: 'v8',
			include: [path.resolve('./src/**/*.{js,ts}')],
			exclude: [
				path.resolve('./src/app.d.ts'),
				path.resolve('./src/**/browser/*.{js,ts}'),
				path.resolve('./src/**/definitions.{js,ts}'),
				path.resolve('./src/lib/types/*.{js,ts}'),
				path.resolve('./src/lib/**/*.browser.ts'),
				path.resolve('./src/lib/index.ts'),
				path.resolve('./src/lib/components/'),
			],
		},
	},
	build: {
		target: 'esnext',
		rollupOptions: {
			external: ['dompurify'],
		},
	},
})
