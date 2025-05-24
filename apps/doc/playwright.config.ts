import type {PlaywrightTestConfig} from '@playwright/test'

import config from '@fat-fuzzy/config'
const {playwright} = config

const deviceScaleFactor = 1 // Monitor defaults

const sharedOptions = {
	deviceScaleFactor,
}

const playwrightConfig: PlaywrightTestConfig = {
	...playwright,
	timeout: 1000,
	projects: [
		{
			name: 'Desktop',
			testMatch: /(.+\.)?(test|spec)\.[jt]s/,
			use: {
				...sharedOptions,
			},
		},
	],
}

export default playwrightConfig
