import {test, expect} from '@playwright/test'
import utils from '../utils/constants'

const categories = [...utils.categories.ready, ...utils.categories.draft]
const sidebarTestId = 'nav-sidebar'
const subnavId = 'sidenav-ui'
// const blocks = [...utils.blocks.ready, ...utils.blocks.draft]

categories.forEach(async (category) => {
	test(`UI categories navigation works as expected: ${category} link`, async ({
		page,
	}) => {
		await page.goto(utils.categories.path())
		await expect(page.getByTestId(sidebarTestId)).toBeVisible()
		// TODO: Enable open sidebar by default on > 1100px breakpoints
		await page.getByTestId(sidebarTestId).getByText(category).click()
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
		await page
			.getByTestId(sidebarTestId)
			.getByTestId(`label-toggle-blocks`)
			.click()
		await expect(page.getByTestId(`${subnavId}-blocks`)).toBeVisible()
		await page.getByRole('link', {name: block, exact: true}).click()
		await expect(page.getByRole('heading', {name: block})).toBeVisible()
	})
})

utils.blocks.draft.forEach(async (block) => {
	test(`UI draft pages are not found: ${block} link`, async ({page}) => {
		await page.goto(`${utils.blocks.path()}/${block}`)
		await expect(page.getByText('404: Not Found')).toBeVisible()
	})
})
