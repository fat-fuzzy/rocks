
import playwright from '@fat-fuzzy/config/playwright'

/** @type { import("@playwright/test").PlaywrightTestConfig } */
const playwrightConfig = {
	...playwright,
	timeout: 1000,
	projects: [
		{
			name: 'Desktop',
			testMatch: /(.+\.)?(test|spec)\.[jt]s/,
		},
	],
}

export default playwrightConfig
