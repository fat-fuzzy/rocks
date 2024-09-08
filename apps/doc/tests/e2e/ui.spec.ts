import {test, expect} from '@playwright/test'
import utils from '../utils/constants'

const categories = [...utils.categories.ready, ...utils.categories.draft]
// const blocks = [...utils.blocks.ready, ...utils.blocks.draft]

categories.forEach(async (category) => {
	test(`UI page navigation works as expected: ${category} link`, async ({
		page,
	}) => {
		await page.goto(utils.categories.path())
		await expect(page.getByTestId('nav-nav-page')).toBeVisible()
		await page
			.getByTestId('nav-nav-page')
			.getByRole('link', {name: category})
			.click()
		await expect(
			page.getByRole('heading', {level: 1, name: category}),
		).toBeVisible()
	})
})

utils.blocks.ready.forEach(async (block) => {
	test(`UI page navigation works as expected: ${block} link`, async ({
		page,
	}) => {
		await page.goto(utils.blocks.path())
		await expect(page.getByTestId('nav-nav-page')).toBeVisible()
		await page
			.getByTestId('nav-nav-page')
			.getByTestId('button-reveal-blocks')
			.click()
		await page
			.getByTestId('nav-nav-page')
			.getByTestId('nav-page--ui-blocks')
			.getByRole('link', {name: block})
			.click()
		await expect(
			page.getByRole('heading', {level: 1, name: block}),
		).toBeVisible()
	})
})

utils.blocks.draft.forEach(async (block) => {
	test(`UI page navigation works as expected: ${block} link`, async ({
		page,
	}) => {
		await page.goto(`${utils.blocks.path()}/${block}`)
		await expect(
			page.getByRole('heading', {level: 1, name: '404'}),
		).toBeVisible()
	})
})
