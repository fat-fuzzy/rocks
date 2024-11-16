import {test, expect} from '@playwright/test'

// Example locators for range inputs
test.skip('test', async ({page}) => {
	await page
		.locator('[data-testid="sketch-003-context-2d-rotation-angle"]')
		.fill('200')
	await page
		.locator('[data-testid="sketch-003-context-2d-scale-height"]')
		.fill('-3.43')
	await page
		.locator('[data-testid="sketch-003-context-2d-scale-width"]')
		.fill('5')
})
