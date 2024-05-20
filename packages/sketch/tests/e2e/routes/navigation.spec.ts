import {test, expect} from '@playwright/test'
import lib from '@fat-fuzzy/lib'

const sketches = lib.gfx.sketches.map((sketch) => sketch.meta)

test('has title', async ({page}) => {
	await page.goto('/')
	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Fat Fuzzy Play/)
})

await Promise.all(
	sketches.map((sketch) => {
		test(`get navigation ${sketch.title}`, async ({page}) => {
			// Click the get started link.
			await page.goto('/')
			await page
				.getByLabel('Nav')
				.getByRole('link', {name: sketch.title})
				.click()

			// Expects page to have a heading with the name of Installation.
			await expect(page.getByRole('heading', {name: 'Play'})).toBeVisible()
			await expect(
				page.getByRole('heading', {name: ` ❤︎ ${sketch.title}`}),
			).toBeVisible()
		})
	}),
)
