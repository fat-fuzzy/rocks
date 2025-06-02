import playwright from '@fat-fuzzy/config/playwright'

/** @type { import("@playwright/test").PlaywrightTestConfig } */
const playwrightConfig = {
	...playwright,
	projects: [
		{
			name: 'Desktop',
			testMatch: /(.+\.)?(test|spec)\.[jt]s/,
		},
	],
}

export default playwrightConfig
