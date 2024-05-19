import {expect, test} from '@playwright/test'

test('Sketch page loads OK', async ({page}) => {
	await page.goto('/random-rect')

	// Expects page to have a heading with the name the Sketch
	await expect(page.getByRole('heading', {name: 'Play'})).toBeVisible()
	await expect(page.getByRole('heading', {name: ' ❤︎ Random'})).toBeVisible()
	// TODO: Load a Sketch and check that it loads OK

})
