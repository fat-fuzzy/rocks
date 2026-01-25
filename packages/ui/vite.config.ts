import {sveltekit} from '@sveltejs/kit/vite'
import {defineConfig} from 'vitest/config'

// NOTE: if a test has not been cancelled properly it can leave a a process running on Svelte's preview port and the tests will not run. To fix this :
// Find the process with the command: `lsof -i:4173`
// Kill the process using the PID returned by the previous command: `kill -9 1234` (where `1234 is the PID)
export default defineConfig({
	plugins: [sveltekit()],
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
				'src/lib/components/*.svelte',
			],
		},
	},
	build: {
		target: 'esnext',
		rollupOptions: {external: ['dompurify']},
	},
})
