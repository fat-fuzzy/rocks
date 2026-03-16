import {defineConfig, devices} from '@playwright/test'
import playwright from '@fat-fuzzy/config/playwright'

/** @type { import("@playwright/test").PlaywrightTestConfig } */
export default defineConfig({
	...playwright,
	projects: [
		{
			name: 'Desktop',
			use: {
				...devices['Desktop Chrome'],
				launchOptions: {
					args: ['--enable-gpu'],
				},
			},
			testMatch: /(.+\.)?(test|spec)\.[jt]s/,
		},
	],
})
