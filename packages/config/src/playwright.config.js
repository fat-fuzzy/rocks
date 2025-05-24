const PORT = 4173

/** @type { import("@playwright/test").PlaywrightTestConfig } */
const config = {
	timeout: 10000,
	retries: 2,
	workers: '50%',
	maxFailures: undefined,
	use: {
		// screenshot: 'only-on-failure',
		trace: 'retain-on-failure',
		// Base URL to use in actions like `await page.goto('/')`.
		baseURL: `http://localhost:${PORT}`,
	},
	webServer: {
		command: 'pnpm build && pnpm preview', // This will run tests in watch mode
		port: PORT,
	},
	testDir: 'tests/e2e',
	outputDir: 'tests/e2e/test-results',
}

export default config
