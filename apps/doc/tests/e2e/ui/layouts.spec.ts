import {expect, test} from '@playwright/test'
import utils from '../../utils/constants'

const {ready, draft} = utils.layouts
const path = utils.layouts.path()

// const components = [...ready, ...draft]

ready.forEach((component) => {
	test(`${component} page has expected headings and content`, async ({
		page,
	}) => {
		await page.goto(`${path}/${component}`)
		await expect(
			page.getByRole('heading', {level: 1, name: component}),
		).toBeVisible()
		await expect(
			page.getByRole('heading', {level: 2, name: 'Usage'}),
		).toBeVisible()
		await expect(
			page.getByRole('heading', {level: 2, name: `Resources`}),
		).toBeVisible()
	})
})

draft.forEach((component) => {
	test(`${component} page has expected headings and content`, async ({
		page,
	}) => {
		await page.goto(`${path}/${component}`)
		await expect(
			page.getByRole('heading', {level: 1, name: component}),
		).toBeVisible()
		await expect(page.getByText('Doc Coming Soon!')).toBeVisible()
	})
})
