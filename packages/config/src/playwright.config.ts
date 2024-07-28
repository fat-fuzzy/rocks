import type {PlaywrightTestConfig} from '@playwright/test'

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'pnpm build && pnpm preview', // This will run tests in watch mode
		port: 4173,
	},
	testDir: 'tests/e2e',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
}

export default config
