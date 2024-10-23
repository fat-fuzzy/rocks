import {test, expect} from '@playwright/test'
import utils from '../utils/constants'
import errorUtils from '../utils/errors'

const pages = utils.pages
const errors = errorUtils.httpErrors
const errorCodes = Object.keys(errors)

test('has title', async ({page}) => {
	await page.goto('/')
	await expect(
		page.getByRole('heading', {name: 'Fat Fuzzy Rocks'}),
	).toBeVisible()
	await expect(page.getByRole('heading', {name: 'Contents'})).toBeVisible()
})

pages.forEach((item) => {
	test(`Main navigation works as expected: ${item.title} page`, async ({
		page,
	}) => {
		await page.goto('/')
		await page.getByTestId('scrolly').hover()
		await page.mouse.wheel(0, 200)
		if (item.title === 'Home') {
			await expect(
				page.getByRole('heading', {name: `Fat Fuzzy Rocks`}),
			).toBeVisible()
		} else {
			await page.getByRole('link', {name: item.title}).click()
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
	await page.goto('/doc')
	await expect(page.getByRole('button', {name: 'Brightness'})).toBeVisible()
	await expect(page.getByRole('button', {name: 'Contrast'})).toBeVisible()
	await expect(
		page.getByRole('link', {name: 'GitHub', exact: true}),
	).toBeVisible()
})

pages.forEach((item) => {
	errorCodes.forEach((code) => {
		let error = errors[code]
		test(`Returns ${code} error if ${error.condition}: page ${item.title}`, async ({
			page,
		}) => {
			await error.testFn(page, item)
			await expect(page.getByText(error.message)).toBeVisible()
			await expect(
				page.getByRole('heading', {name: `Fat Fuzzy ${code}`}),
			).toBeVisible()
		})

		if (item.items) {
			item.items.forEach((subpage) => {
				test(`Returns ${code} error if ${error.condition}: page ${subpage.title}`, async ({
					page,
				}) => {
					await error.testFn(page, subpage)
					await expect(page.getByText(error.message)).toBeVisible()
				})
			})
		}
	})
})
