import {test, expect} from '@playwright/test'
import utils from '../utils/constants'

const categories = [...utils.categories.ready, ...utils.categories.draft]
const sidebarTestId = 'sidebar--ui'
// const blocks = [...utils.blocks.ready, ...utils.blocks.draft]

categories.forEach(async (category) => {
	test(`UI categories navigation works as expected: ${category} link`, async ({
		page,
	}) => {
		await page.goto(utils.categories.path())
		await expect(page.getByTestId(sidebarTestId)).toBeVisible()
		await page
			.getByTestId(sidebarTestId)
			.getByRole('link', {name: category})
			.click()
		await expect(
			page.getByRole('heading', {level: 1, name: category}),
		).toBeVisible()
	})
})

utils.blocks.ready.forEach(async (block) => {
	test(`UI blocks navigation works as expected: ${block} link`, async ({
		page,
	}) => {
		await page.goto(utils.blocks.path())
		await expect(page.getByTestId(`${sidebarTestId}-blocks`)).toBeVisible()
		await page
			.getByTestId(sidebarTestId)
			.getByTestId('button-reveal-blocks')
			.click()
		await page
			.getByTestId(sidebarTestId)
			.getByTestId(`${sidebarTestId}-blocks`)
			.getByRole('link', {name: block})
			.click()
		await expect(
			page.getByRole('heading', {level: 1, name: block}),
		).toBeVisible()
	})
})

utils.blocks.draft.forEach(async (block) => {
	test(`UI draft pages are not found: ${block} link`, async ({page}) => {
		await page.goto(`${utils.blocks.path()}/${block}`)
		await expect(
			page.getByRole('heading', {level: 1, name: '404'}),
		).toBeVisible()
	})
})
