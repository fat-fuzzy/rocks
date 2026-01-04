import {sveltekit} from '@sveltejs/kit/vite'
import {defineConfig} from 'vitest/config'

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		reporters: ['html'],
		include: [
			'src/**/*.{test,spec}.{js,ts}',
			'tests/unit/**/*.{test,spec}.{js,ts}',
		],
		exclude: ['tests/unit/**/dom/*.{test,spec}.ts'],
		coverage: {
			enabled: true,
			provider: 'v8',
			include: ['src/**/*.{js,ts}'],
			exclude: [
				'src/app.d.ts',
				'src/**/*.dom.{js,ts}',
				'src/**/definitions.{js,ts}',
				'src/lib/types/*.{js,ts}',
				'src/lib/**/*.dom.ts',
				'src/lib/components/*.svelte',
			],
		},
	},
	build: {
		target: 'esnext',
		rollupOptions: {external: ['dompurify']},
	},
})
