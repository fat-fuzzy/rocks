import {expect, test} from '@playwright/test'
import gfx from '@fat-fuzzy/gfx'

const sketches = gfx.gl.sketches.learning
	.filter((sketch) => sketch.meta.draft === undefined)
	.map((sketch) => sketch.meta)
let previousEvent
let currentEvent

/**
 * Test the Player's Play/Pause button works as expected for each sketch.
 */
sketches.map((sketch) => {
	test(`"${sketch.title}" sketch: Play button works as expected`, async ({
		page,
	}) => {
		await page.goto(`/${sketch.slug}`)

		previousEvent = page
			.getByTestId('debug-table')
			.getByTestId(`debug-event-player`)
			.getByTestId(`previous-event`)

		currentEvent = page
			.getByTestId('debug-table')
			.getByTestId(`debug-event-player`)
			.getByTestId(`current-event`)

		await expect(previousEvent).toHaveText('loadOk')
		await expect(currentEvent).toHaveText('loadOk')

		// Expects the Play button to start the canvas animation
		await page.getByRole('button', {name: 'Play'}).click()

		// Expects the Player to enable available actions: Stop, Clear
		await expect(page.getByRole('button', {name: 'Stop'})).toBeEnabled()
		await expect(page.getByRole('button', {name: 'Clear'})).toBeEnabled()

		await expect(previousEvent).toHaveText('loadOk')
		await expect(currentEvent).toHaveText('play')

		// Expects the Pause button to pause the canvas animation
		await page.getByRole('button', {name: 'Pause'}).click()

		await expect(previousEvent).toHaveText('play')
		await expect(currentEvent).toHaveText('pause')

		// Actions should be enabled
		await expect(page.getByRole('button', {name: 'Stop'})).toBeEnabled()
		await expect(page.getByRole('button', {name: 'Clear'})).toBeEnabled()

		// Expects the Play button to resume the canvas animation
		await page.getByRole('button', {name: 'Play'}).click()
		await expect(currentEvent).toHaveText('play')

		// Actions should be enabled
		await expect(page.getByRole('button', {name: 'Stop'})).toBeEnabled()
		await expect(page.getByRole('button', {name: 'Clear'})).toBeEnabled()
	})
})
