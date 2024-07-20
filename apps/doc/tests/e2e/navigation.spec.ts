import {test, expect} from '@playwright/test'

test('has title', async ({page}) => {
	await page.goto('/')
	await expect(
		page.getByRole('heading', {name: 'Fat Fuzzy Rocks'}),
	).toBeVisible()
	await expect(page.getByRole('heading', {name: '✨ Highlights'})).toBeVisible()
})

test(`Main navigation works as expected`, async ({page}) => {
	await page.goto('/')
	await expect(page.getByRole('link', {name: 'Home'})).toBeVisible()
	await expect(page.getByRole('link', {name: 'Doc'})).toBeVisible()
	await expect(page.getByRole('link', {name: 'UI'})).toBeVisible()
	await expect(page.getByRole('link', {name: 'Play'})).toBeVisible()
})

test(`Settings menu works as expected`, async ({page}) => {
	await page.goto('/')
	await expect(page.getByRole('button', {name: 'Brightness'})).toBeVisible()
	await expect(page.getByRole('button', {name: 'Contrast'})).toBeVisible()
	await expect(page.getByRole('link', {name: 'GitHub'})).toBeVisible()
})
