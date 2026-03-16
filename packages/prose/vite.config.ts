import {defineConfig} from 'vitest/config'
import {sveltekit} from '@sveltejs/kit/vite'

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
				'src/lib/index.ts',
				'src/lib/editor/',
			],
		},
	},
})
