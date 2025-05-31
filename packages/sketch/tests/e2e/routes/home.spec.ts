import {expect, test} from '@playwright/test'

test('Home page has expected headings', async ({page}) => {
	await page.goto('/')
	await expect(
		page.getByRole('heading', {name: 'Fat Fuzzy Play'}),
	).toBeVisible()
})
