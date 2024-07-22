import {expect, test} from '@playwright/test'
import utils from '../../utils/constants'

const {ready, draft} = utils.categories
const path = utils.categories.path

// const components = [...ready, ...draft]

ready.forEach((category) => {
	test(`${category} page has expected headings and content`, async ({page}) => {
		await page.goto(`${path}/${category.toLowerCase()}`)
		await expect(
			page.getByRole('heading', {level: 1, name: category}),
		).toBeVisible()
		await expect(
			page.getByRole('heading', {level: 2, name: `What are ${category} ?`}),
		).toBeVisible()
		await expect(
			page.getByRole('heading', {level: 2, name: `Resources`}),
		).toBeVisible()
	})
})

draft.forEach((category) => {
	test(`${category} page has expected headings and content`, async ({page}) => {
		await page.goto(`${path}/${category.toLowerCase()}`)
		await expect(
			page.getByRole('heading', {level: 1, name: category}),
		).toBeVisible()
		await expect(
			page.getByRole('heading', {level: 2, name: `What are ${category} ?`}),
		).toBeVisible()
	})
})
