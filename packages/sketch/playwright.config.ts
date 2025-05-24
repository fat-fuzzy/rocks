import type {PlaywrightTestConfig} from '@playwright/test'

import config from '@fat-fuzzy/config'
const {playwright} = config

const playwrightConfig: PlaywrightTestConfig = {
	...playwright,
	timeout: 3000,
	projects: [
		{
			name: 'Desktop',
			testMatch: /(.+\.)?(test|spec)\.[jt]s/,
		},
	],
}

export default playwrightConfig
