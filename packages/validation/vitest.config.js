import {defineConfig} from 'vitest/config'

export default defineConfig({
	test: {
		reporters: ['html'],
		include: ['src/**/*.{test,spec}.{js,ts}', 'tests/**/*.{test,spec}.{js,ts}'],
		coverage: {
			enabled: true,
			provider: 'v8',
			include: ['src/**/*.{js,ts}'],
			exclude: ['src/**/definitions.{js,ts}', 'src/ajv/out/*.{js,ts}'],
		},
	},
})
