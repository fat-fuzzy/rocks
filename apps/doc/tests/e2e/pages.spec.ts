import {test, expect} from '@playwright/test'
import utils from '../utils/constants'

const pages = utils.pages

pages.forEach((item) => {
	test(`Page content loads on refresh: ${item.title} page`, async ({page}) => {
		await page.goto('/')
		if (item.title === 'Home') {
			await page.reload()
			await expect(page.getByRole('link', {name: `Play`}).nth(0)).toBeVisible()
		} else {
			await page.goto(`/${item.slug}`)
			await page.reload()
			await expect(page.getByTestId(`html-${item.slug}`)).toBeVisible()
		}
	})

	if (item.items) {
		item.items.forEach((subpage) => {
			test(`Sub page content on refresh: ${subpage.title}`, async ({page}) => {
				await page.goto(`/${item.slug}/${subpage.slug}`)
				await page.reload()
				if (item.slug !== 'about') {
					await expect(page.getByTestId(`html-${subpage.slug}`)).toBeVisible()
				} else {
					await expect(page.getByRole('link', {name: `0 -`})).toBeVisible()
				}
			})
		})
	}
})
