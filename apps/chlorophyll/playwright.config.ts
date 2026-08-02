import {defineConfig, devices} from '@playwright/test'
import playwright from '@fat-fuzzy/config/playwright'

/** @type { import("@playwright/test").PlaywrightTestConfig } */
export default defineConfig({
	...playwright,
	timeout: 1000,
	projects: [
		{
			name: 'Desktop',
			...devices['Desktop Chrome'],
			testMatch: /(.+\.)?(test|spec)\.[jt]s/,
		},
	],
})
