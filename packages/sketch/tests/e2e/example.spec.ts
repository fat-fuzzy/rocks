import {test, expect} from '@playwright/test'

test('has title', async ({page}) => {
	await page.goto('/')

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Fat Fuzzy Play/)
})

test('get navigation', async ({page}) => {
	await page.goto('/')

	// Click the get started link.
	await page
		.getByRole('navigation')
		.getByRole('link', {name: '🎰Random'})
		.click()

	// Expects page to have a heading with the name of Installation.
	await expect(page.getByRole('heading', {name: 'Play'})).toBeVisible()
	await expect(page.getByRole('heading', {name: ' ❤︎ Random'})).toBeVisible()
})
