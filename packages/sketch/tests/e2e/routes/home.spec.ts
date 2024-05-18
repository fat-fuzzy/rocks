import {expect, test} from '@playwright/test'

test('index page has expected headings', async ({page}) => {
	await page.goto('/')
	await expect(
		page.getByRole('heading', {name: 'Fat Fuzzy Play'}),
	).toBeVisible()
	await expect(page.getByRole('heading', {name: 'Tags'})).toBeVisible()
})
