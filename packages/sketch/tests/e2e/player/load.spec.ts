import {expect, test} from '@playwright/test'
import lib from '@fat-fuzzy/lib'

const sketches = lib.gfx.sketches.map((sketch) => sketch.meta)

/**
 * Test the Player loads in idle state for each sketch.
 */
await Promise.all(
	sketches.map((sketch) => {
		test(`${sketch.title} Player loads in idle state`, async ({page}) => {
			await page.goto(`/${sketch.slug}`)

			// Expects the Player to enable the available action: Play
			await expect(page.getByRole('button', {name: 'play'})).toBeEnabled()
			// Expects the Player to disable unavailable actions: Stop, Clear
			await expect(page.getByRole('button', {name: 'stop'})).toBeDisabled()
			await expect(page.getByRole('button', {name: 'clear'})).toBeDisabled()
		})
	}),
)
