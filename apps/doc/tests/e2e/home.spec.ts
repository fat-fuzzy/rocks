import {expect, test} from '@playwright/test'

test('index page has expected headings', async ({page}) => {
	await page.goto('/')
	await expect(
		page.getByRole('heading', {name: 'Fat Fuzzy Rocks'}),
	).toBeVisible()
	await expect(
		page.getByRole('heading', {name: '✨ Contents ✨'}),
	).toBeVisible()
})
