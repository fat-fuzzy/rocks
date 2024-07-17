import {expect, test} from '@playwright/test'

test('index page has expected headings', async ({page}) => {
	await page.goto('/')
	await expect(
		page.getByRole('heading', {name: 'Fat Fuzzy Rocks'}),
	).toBeVisible()
	await expect(page.getByRole('heading', {name: '✨ Highlights'})).toBeVisible()

	// Main navigation
	await expect(page.getByRole('link', {name: 'Home'})).toBeVisible()
	await expect(page.getByRole('link', {name: 'About'})).toBeVisible()
	await expect(page.getByRole('link', {name: 'UI'})).toBeVisible()
	await expect(page.getByRole('link', {name: 'Log'})).toBeVisible()
	await expect(page.getByRole('link', {name: 'Play'})).toBeVisible()

	// Side navigation
	await expect(page.getByRole('button', {name: 'Brightness'})).toBeVisible()
	await expect(page.getByRole('button', {name: 'Contrast'})).toBeVisible()
	await expect(page.getByRole('link', {name: 'GitHub'})).toBeVisible()
})
