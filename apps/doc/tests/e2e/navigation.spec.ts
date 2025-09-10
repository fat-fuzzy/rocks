import {test, expect} from '@playwright/test'
import utils from '../utils/constants'
import errorUtils from '../utils/errors'

const pages = utils.pages
const errors = errorUtils.httpErrors
const errorCodes = Object.keys(errors)
const sidebarTestId = 'nav-sidebar'

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
		await page.goto('/', {waitUntil: 'networkidle'})
		await page.getByTestId('scrolly').hover()
		await page.mouse.wheel(0, 200)
		if (item.title === 'Home') {
			await expect(
				page.getByRole('heading', {name: `Fat Fuzzy Rocks`}),
			).toBeVisible()
		} else {
			await page.getByRole('link', {name: item.title}).nth(0).click()
			const name =
				item.title === 'About' ? 'What the Fuzzy ??' : `Fat Fuzzy ${item.title}`
			await expect(page.getByRole('heading', {name})).toBeVisible()
		}
	})

	if (item.items && item.items?.length > 0) {
		item.items.forEach((subpage) => {
			test(`Sub navigation works as expected: ${subpage.title}`, async ({
				page,
			}) => {
				await page.goto('/')
				await page.getByRole('link', {name: item.title}).nth(0).click()
				await page
					.getByTestId(sidebarTestId)
					.getByRole('button', {name: item.title})
					.click()
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
	await page.goto('/about')
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
			await expect(page.getByText('404: Not Found')).toBeVisible()
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
