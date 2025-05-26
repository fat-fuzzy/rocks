import {expect, test} from '@playwright/test'
import gfx from '@fat-fuzzy/gfx'

const sketches = gfx.gl.sketches.learning
	.filter((sketch) => !sketch.meta.draft)
	.map((sketch) => sketch.meta)

/**
 * Test the Player loads in idle state for each sketch.
 */
sketches.map((sketch) => {
	test(`"${sketch.title}" sketch: Player loads in idle state`, async ({
		page,
	}) => {
		await page.goto(`/${sketch.slug}`)
		// Expects the Player to enable the available action: Play
		await expect(page.getByRole('button', {name: 'play'})).toBeEnabled()
		// Expects the Player to disable unavailable actions: Stop, Clear
		await expect(page.getByRole('button', {name: 'stop'})).toBeDisabled()
		await expect(page.getByRole('button', {name: 'clear'})).toBeDisabled()
	})
})
