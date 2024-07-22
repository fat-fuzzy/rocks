import {expect, test} from '@playwright/test'

test('index page has expected headings', async ({page}) => {
	await page.goto('/')
	await expect(
		page.getByRole('heading', {name: 'CSS Pattern library'}),
	).toBeVisible()
})
