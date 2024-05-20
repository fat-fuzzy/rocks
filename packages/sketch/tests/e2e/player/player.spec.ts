import {expect, test} from '@playwright/test'
import lib from '@fat-fuzzy/lib'

const sketches = lib.gfx.sketches.map((sketch) => sketch.meta)
let previousEvent
let currentEvent
let updateEvent = 'update'
let playEvent = 'play'

test('Player loads in idle state', async ({page}) => {
	await page.goto('/random-rect')

	// Expects the Player to enable the available action: Play
	await expect(page.getByRole('button', {name: 'play'})).toBeEnabled()
	// Expects the Player to disable unavailable actions: Stop, Clear
	await expect(page.getByRole('button', {name: 'stop'})).toBeDisabled()
	await expect(page.getByRole('button', {name: 'clear'})).toBeDisabled()
})

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

/**
 * Test the Player Play button works as expected for each sketch.
 */
await Promise.all(
	sketches.map((sketch) => {
		test(`${sketch.title} Play button works as expected`, async ({page}) => {
			await page.goto(`/${sketch.slug}`)

			// Expects the Play button to start the canvas animation
			await page.getByRole('button', {name: '✨ Play'}).click()

			previousEvent = await page
				.getByTestId('debug-table')
				.getByTestId(`debug-event-player`)
				.getByTestId(`previous-event`)

			currentEvent = await page
				.getByTestId('debug-table')
				.getByTestId(`debug-event-player`)
				.getByTestId(`current-event`)
			// TODO: Fix initial player state ? or this test
			// await expect(previousEvent).toHaveText('idle')

			if (
				// sketch.controls.includes('camera') || 	// TODO: Fix this control update
				sketch.controls.includes('geometry-2d') ||
				sketch.controls.includes('geometry-3d')
			) {
				await expect(currentEvent).toHaveText('update')
			} else {
				await expect(currentEvent).toHaveText('play')
			}

			// Expects the Play button to pause the canvas animation

			// TODO: Fix asset emoji:pause
			await page.getByRole('button', {name: '✨ Pause'}).click()

			previousEvent = await page
				.getByTestId('debug-table')
				.getByTestId(`debug-event-player`)
				.getByTestId(`previous-event`)

			currentEvent = await page
				.getByTestId('debug-table')
				.getByTestId(`debug-event-player`)
				.getByTestId(`current-event`)

			if (
				// sketch.controls.includes('camera') || 	// TODO: Fix this control update
				sketch.controls.includes('geometry-2d') ||
				sketch.controls.includes('geometry-3d')
			) {
				await expect(previousEvent).toHaveText('update')
			} else {
				await expect(previousEvent).toHaveText('play')
			}
			await expect(currentEvent).toHaveText('pause')
		})
	}),
)
