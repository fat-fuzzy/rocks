import {test, expect} from '@playwright/test'

const url = 'http://localhost:5173/'

test('has title', async ({page}) => {
	await page.goto(url)

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Fat Fuzzy/)
})

test('ui library link', async ({page}) => {
	await page.goto(url)

	// Click the get started link.
	await page.getByRole('link', {name: 'UI', exact: true}).click()

	// Expects the URL to contain intro.
	await expect(page).toHaveURL(/.*ui/)
})
