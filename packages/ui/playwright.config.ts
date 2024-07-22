import type {PlaywrightTestConfig} from '@playwright/test'

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'pnpm build && pnpm preview', // This will run tests in watch mode
		port: 4173,
		reuseExistingServer: true,
	},
	testDir: 'tests/e2e',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	// reporter: [
	// 	[
	// 		'html',
	// 		{
	// 			open: process.env.CI ? 'never' : 'always', // if on CI then "never" otherwise "always" show
	// 		},
	// 	],
	// ],
}

export default config
