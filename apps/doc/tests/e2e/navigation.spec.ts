import {test, expect} from '@playwright/test'
import utils from '../utils/constants'

const pages = utils.pages

test('has title', async ({page}) => {
	await page.goto('/')
	await expect(
		page.getByRole('heading', {name: 'Fat Fuzzy Rocks'}),
	).toBeVisible()
	await expect(page.getByRole('heading', {name: '✨ Highlights'})).toBeVisible()
})

pages.forEach((item) => {
	test(`Main navigation works as expected: ${item.title} page`, async ({
		page,
	}) => {
		await page.goto('/')
		await page.getByRole('link', {name: item.title, exact: true}).click()
		if (item.title === 'Home') {
			await expect(
				page.getByRole('heading', {name: `Fat Fuzzy Rocks`}),
			).toBeVisible()
		} else {
			await expect(
				page.getByRole('heading', {name: `Fat Fuzzy ${item.title}`}),
			).toBeVisible()
		}
	})

	if (item.items) {
		item.items.forEach((subpage) => {
			test(`Sub navigation works as expected: ${subpage.title}`, async ({
				page,
			}) => {
				await page.goto('/')
				await page.getByRole('link', {name: item.title}).click()
				await page.getByTestId(`button-reveal-${subpage.slug}`).click()
				await expect(
					page.getByRole('link', {name: subpage.linkTitle}),
				).toBeVisible()
			})
		})
	}
})

test(`Settings menu works as expected`, async ({page}) => {
	await page.goto('/')
	await expect(page.getByRole('button', {name: 'Brightness'})).toBeVisible()
	await expect(page.getByRole('button', {name: 'Contrast'})).toBeVisible()
	await expect(page.getByRole('link', {name: 'GitHub'})).toBeVisible()
})
