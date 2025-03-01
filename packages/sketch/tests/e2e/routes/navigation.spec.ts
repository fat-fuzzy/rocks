import {test, expect} from '@playwright/test'
import gfx from '@fat-fuzzy/gfx'

const sketches = gfx.gl.sketches.learning
	.filter((sketch) => !sketch.meta.draft)
	.map((sketch) => sketch.meta)

test('has title', async ({page}) => {
	await page.goto('/')
	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Fat Fuzzy Play/)
})

sketches.map((sketch) => {
	test(`"${sketch.title}" sketch page navigation OK`, async ({page}) => {
		// Click the get started link.
		await page.goto('/')
		await page
			.getByLabel('Sketches')
			.getByRole('link', {name: sketch.title, exact: false})
			.click()

		// Expects page to have a heading with the name of Installation.
		await expect(page.getByRole('heading', {name: 'Play'})).toBeVisible()
		await expect(
			page.getByRole('heading', {name: ` ❤︎ ${sketch.title}`}),
		).toBeVisible()
	})
})
